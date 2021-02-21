import { NoteServiceClient } from "gen/proto/notes_grpc_pb"
import { credentials } from "@grpc/grpc-js"
import assert from "assert"
import { grpcClientOptions, port } from "config/env"
import { Note, NoteArgs, NoteRequestId } from "gen/proto/notes_pb"
import DB from "config/connectDB"
import { ObjectID } from "mongodb"



describe("Delete Test", () => {
    let client: NoteServiceClient
    let del: Function
    before(async () => {
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
})