import { NoteServiceClient } from "gen/proto/notes_grpc_pb"
import { credentials } from "@grpc/grpc-js"
import assert from "assert"
import { grpcClientOptions, port } from "config/env"
import { Note } from "gen/proto/notes_pb"
import DB from "config/connectDB"
import { ObjectId } from "mongodb"

const mockPost = [
    {
        title: "mocha test1",
        content: "content test1",
        name: "pukuba"
    },
    {
        title: "mocha test2",
        content: "content test2",
        name: "erolf0123"
    },
    {
        title: "mocha test3",
        content: "content test3",
        name: "kkzkk1234"
    },
]

describe("Update Test", () => {
    let client: NoteServiceClient
    let update: Function
    const postsId: ObjectId[] = []
    before(async () => {
        const db = await DB.get()
        const { insertedIds } = await db.collection("post").insertMany(mockPost)
        postsId.push(...Object.keys(insertedIds).map((id) => insertedIds[id]))
        client = new NoteServiceClient(
            `localhost:${port}`,
            credentials.createInsecure(),
            grpcClientOptions
        )
        update = (note: Note) => {
            return new Promise((resolve, reject) => {
                client.update(note, (error, response) => {
                    if (error || response === undefined) {
                        return reject({
                            code: error?.code || 500,
                            message: error?.message || "something went wrong"
                        })
                    }
                    return resolve(response.toObject())
                })
            })
        }
    })
    after(async () => {
        const db = await DB.get()
        await db.collection("post").deleteMany({})
    })
    describe("Update Success", () => {
        it("Case - 1", async () => {
            const req = new Note()
            req.setContent("Update Content!")
            req.setId(postsId[0] + "")
            const res = await update(req)
            assert.deepStrictEqual(postsId[0], new ObjectId(res.id))
            assert.strictEqual(res.name, "pukuba")
            assert.strictEqual(res.content, "Update Content!")
            assert.strictEqual(res.title, "mocha test1")
        })

        it("Case - 2", async () => {
            const req = new Note()
            req.setContent("Update Content!")
            req.setTitle("Update Title!")
            req.setName("Update Name!")
            req.setId(postsId[1] + "")
            const res = await update(req)
            assert.deepStrictEqual(postsId[1], new ObjectId(res.id))
            assert.strictEqual(res.name, "Update Name!")
            assert.strictEqual(res.content, "Update Content!")
            assert.strictEqual(res.title, "Update Title!")
        })
    })

    describe("Update Failure", () => {
        it("Case - 1", async () => {
            const req = new Note()
            req.setName("Nam-Seung-Won")
            try {
                await update(req)
            } catch (e) {
                assert.strictEqual(e.code, 2)
                assert.strictEqual(e.message, "2 UNKNOWN: ID not valid")
            }
        })

        it("Case - 2", async () => {
            const req = new Note()
            req.setId("erolf0123,pukuba,kkzkk1234")
            try {
                await update(req)
            } catch (e) {
                assert.strictEqual(e.code, 2)
                assert.strictEqual(e.message, "2 UNKNOWN: ID not valid")
            }
        })
        it("Case - 3", async () => {
            try {
                await update(new Note())
            } catch (e) {
                assert.strictEqual(e.code, 2)
                assert.strictEqual(e.message, "2 UNKNOWN: ID not valid")
            }
        })
    })
})