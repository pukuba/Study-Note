import { NoteServiceClient } from "gen/proto/notes_grpc_pb"
import { credentials } from "@grpc/grpc-js"
import assert from "assert"
import { grpcClientOptions, port } from "config/env"
import { Note } from "gen/proto/notes_pb"
import DB from "config/connectDB"
import { ObjectId } from "mongodb"
import { mockPost } from "test/mock"

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
            assert.deepStrictEqual(res.name, "pukuba")
            assert.deepStrictEqual(res.content, "Update Content!")
            assert.deepStrictEqual(res.title, "mocha test1")
        }).timeout(10000)

        it("Case - 2", async () => {
            const req = new Note()
            req.setContent("Update Content!")
            req.setTitle("Update Title!")
            req.setName("Update Name!")
            req.setId(postsId[1] + "")
            const res = await update(req)
            assert.deepStrictEqual(postsId[1], new ObjectId(res.id))
            assert.deepStrictEqual(res.name, "Update Name!")
            assert.deepStrictEqual(res.content, "Update Content!")
            assert.deepStrictEqual(res.title, "Update Title!")
        }).timeout(10000)

        it("Case - 3", async () => {
            const req = new Note()
            req.setContent("1")
            req.setTitle("2")
            req.setName("3")
            req.setId(postsId[2] + "")
            const res = await update(req)
            assert.deepStrictEqual(postsId[2], new ObjectId(res.id))
            assert.deepStrictEqual(res.name, "3")
            assert.deepStrictEqual(res.content, "1")
            assert.deepStrictEqual(res.title, "2")
        }).timeout(10000)
    })

    describe("Update Failure", () => {
        it("Case - 1", async () => {
            const req = new Note()
            req.setName("Nam-Seung-Won")
            try {
                await update(req)
            } catch (e) {
                assert.deepStrictEqual(e.code, 2)
                assert.deepStrictEqual(e.message, "2 UNKNOWN: ID not valid")
            }
        }).timeout(10000)

        it("Case - 2", async () => {
            const req = new Note()
            req.setId("erolf0123,pukuba,kkzkk1234")
            try {
                await update(req)
            } catch (e) {
                assert.deepStrictEqual(e.code, 2)
                assert.deepStrictEqual(e.message, "2 UNKNOWN: ID not valid")
            }
        }).timeout(10000)
        it("Case - 3", async () => {
            try {
                await update(new Note())
            } catch (e) {
                assert.deepStrictEqual(e.code, 2)
                assert.deepStrictEqual(e.message, "2 UNKNOWN: ID not valid")
            }
        }).timeout(10000)
        it("Case - 4", async () => {
            const req = new Note()
            req.setId(postsId[0] + "")
            req.setName("")
            req.setTitle("")
            req.setContent("")
            const res = await update(req)
            assert.deepStrictEqual(new ObjectId(res.id), postsId[0])
            assert.notDeepStrictEqual(res.name, "")
            assert.notDeepStrictEqual(res.content, "")
            assert.notDeepStrictEqual(res.title, "")
        })
    })
})