import { NoteServiceClient } from "gen/proto/notes_grpc_pb"
import { credentials } from "@grpc/grpc-js"
import assert from "assert"
import { grpcClientOptions, port } from "config/env"
import { Note, NoteArgs } from "gen/proto/notes_pb"
import DB from "config/connectDB"
import { ObjectID } from "mongodb"

describe(`Create Test`, () => {
    let client: NoteServiceClient
    let insert: Function
    before(async () => {
        client = new NoteServiceClient(
            `localhost:${port}`,
            credentials.createInsecure(),
            grpcClientOptions
        )
        insert = (note: Note) => {
            return new Promise((resolve, reject) => {
                client.insert(note, (error, response) => {
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
    describe(`Create Success`, () => {
        it(`Case - 1`, async () => {
            const db = await DB.get()
            const note = new NoteArgs()
            note.setContent("test Note1")
            note.setName("erolf0123")
            note.setTitle("test title1")
            const result = await insert(note)
            assert.deepStrictEqual(result.name, "erolf0123")
            assert.deepStrictEqual(result.title, "test title1")
            assert.deepStrictEqual(result.content, "test Note1")
            await db.collection("post").deleteOne({ _id: new ObjectID(result.id) })
        }).timeout(10000)
        it(`Case - 2`, async () => {
            const db = await DB.get()
            const note = new NoteArgs()
            note.setContent("test Note2")
            note.setName("pukuba")
            note.setTitle("test title2")
            const result = await insert(note)
            assert.deepStrictEqual(result.name, "pukuba")
            assert.deepStrictEqual(result.title, "test title2")
            assert.deepStrictEqual(result.content, "test Note2")
            await db.collection("post").deleteOne({ _id: new ObjectID(result.id) })
        }).timeout(10000)
    })

    describe(`Create Failure`, async () => {
        it(`Case - 1`, async () => {
            const note = new NoteArgs()
            note.setContent("test Note1")
            try {
                await insert(note)
            } catch (e) {
                assert.deepStrictEqual(e.code, 2)
                assert.deepStrictEqual(e.message, "2 UNKNOWN: invalid input")
            }
        }).timeout(10000)

        it(`Case - 2`, async () => {
            const note = new NoteArgs()
            note.setContent("")
            note.setName("")
            note.setTitle("")
            try {
                await insert(note)
            } catch (e) {
                assert.deepStrictEqual(e.code, 2)
                assert.deepStrictEqual(e.message, "2 UNKNOWN: invalid input")
            }
        }).timeout(10000)
    })
})