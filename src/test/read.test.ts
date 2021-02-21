import { NoteServiceClient } from "gen/proto/notes_grpc_pb"
import { credentials } from "@grpc/grpc-js"
import assert from "assert"
import { grpcClientOptions, port } from "config/env"
import { Empty, NoteRequestId } from "gen/proto/notes_pb"
import DB from "config/connectDB"
import { ObjectId } from "mongodb"
import { noteParams } from "config/types"
import { mockPost } from "test/mock"

describe(`Read Test`, () => {
    let client: NoteServiceClient
    let list: Function
    let get: Function
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
        list = (empty: Empty) => {
            return new Promise((resolve, reject) => {
                client.list(empty, (error, response) => {
                    if (error) {
                        reject({
                            code: error?.code || 500,
                            message: error?.message || "something went wrong",
                        })
                    }
                    return resolve(response.toObject())
                })
            })
        }
        get = (note: NoteRequestId) => {
            return new Promise((resolve, reject) => {
                client.get(note, (error, response) => {
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
        for (const _id of postsId) {
            await db.collection("post").deleteOne({ _id })
        }
    })

    describe("Read Success", () => {
        it("Case - 1", async () => {
            const db = await DB.get()
            const res = await list(new Empty())
            const dbRes = await db.collection("post").find().toArray()
            const resArr = res.notesList.map((note: noteParams) => {
                return {
                    _id: new ObjectId(note.id),
                    title: note.title,
                    content: note.content,
                    name: note.name
                }
            })
            assert.deepStrictEqual(dbRes, resArr)
        }).timeout(10000)

        it("Case - 2", async () => {
            const db = await DB.get()
            const req = new NoteRequestId()
            req.setId(postsId[0] + "")
            const res = await get(req)
            const dbRes = await db.collection("post").findOne({ _id: new ObjectId(res.id) })
            assert.deepStrictEqual(new ObjectId(res.id), dbRes._id)
            assert.strictEqual(res.name, dbRes.name)
            assert.strictEqual(res.title, dbRes.title)
            assert.strictEqual(res.content, dbRes.content)
        }).timeout(10000)
    })

    describe("Read Failure", () => {
        it("Case - 1", async () => {
            const req = new NoteRequestId()
            try {
                await get(req)
            } catch (e) {
                assert.deepStrictEqual(e.code, 2)
                assert.deepStrictEqual(e.message, "2 UNKNOWN: ID not valid")
            }
        }).timeout(10000)

        it("Case - 2", async () => {
            const req = new NoteRequestId()
            req.setId("erolf0123")
            try {
                await get(req)
            } catch (e) {
                assert.deepStrictEqual(e.code, 2)
                assert.deepStrictEqual(e.message, "2 UNKNOWN: ID not valid")
            }
        }).timeout(10000)

        it("Case - 3", async () => {
            const req = new NoteRequestId()
            req.setId("eeeeeeeeeeee")
            try {
                await get(req)
            } catch (e) {
                assert.deepStrictEqual(e.code, 2)
                assert.deepStrictEqual(e.message, "2 UNKNOWN: ID not valid")
            }
        }).timeout(10000)
    })
})