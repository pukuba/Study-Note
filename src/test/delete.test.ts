import { NoteServiceClient } from "gen/proto/notes_grpc_pb"
import { credentials } from "@grpc/grpc-js"
import assert from "assert"
import { grpcClientOptions, port } from "config/env"
import { NoteRequestId } from "gen/proto/notes_pb"
import DB from "config/connectDB"
import { ObjectId } from "mongodb"
import { mockPost } from "test/mock"

describe("Delete Test", () => {
    let client: NoteServiceClient
    let del: Function
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
        del = (note: NoteRequestId) => {
            return new Promise((resolve, reject) => {
                client.delete(note, (error, response) => {
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
    describe("Delete Success", () => {
        it("Case - 1", async () => {
            const db = await DB.get()
            const res = new NoteRequestId()
            res.setId(postsId[0] + "")
            await del(res)
            const dbResult = await db.collection("post").findOne({ _id: postsId[0] })
            assert.strictEqual(dbResult, null)
        })

        it("Case - 2", async () => {
            const db = await DB.get()
            const res = new NoteRequestId()
            res.setId(postsId[1] + "")
            await del(res)
            const dbResult = await db.collection("post").findOne({ _id: postsId[1] })
            assert.strictEqual(dbResult, null)
        })
    })

    describe("Delete Failure", () => {
        it("Case - 1", async () => {
            const res = new NoteRequestId()
            res.setId("pukuba")
            try {
                await del(res)
            } catch (e) {
                assert.strictEqual(e.code, 2)
                assert.strictEqual(e.message, "2 UNKNOWN: ID not valid")
            }
        })

        it("Case - 2", async () => {
            const res = new NoteRequestId()
            res.setId(postsId[2] + "1")
            try {
                await del(res)
            } catch (e) {
                assert.strictEqual(e.code, 2)
                assert.strictEqual(e.message, "2 UNKNOWN: ID not valid")
            }
        })
    })
})