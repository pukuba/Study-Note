import { Empty, Note, NoteArgs, NoteRequestId } from "gen/proto/notes_pb"
import { NoteServiceClient } from "gen/proto/notes_grpc_pb"
import { credentials } from "@grpc/grpc-js"
import { grpcClientOptions, port } from "config/env"
import { insertParams, noteParams, getParams } from "config/types"
const serverURL = `localhost:${port}`

const empty = new Empty()
const Client = new NoteServiceClient(
    serverURL,
    credentials.createInsecure(),
    grpcClientOptions
)

export const list = () => {

    return new Promise((resolve, reject) => {
        Client.list(empty, (error, response) => {
            if (error) {
                console.error(error)
                reject({
                    code: error?.code || 500,
                    message: error?.message || "something went wrong",
                })
            }
            return resolve(response.toObject())
        })
    })
}

export const insert = ({ name, content, title }: insertParams) => {
    const note = new NoteArgs()
    note.setName(name)
    note.setTitle(title)
    note.setContent(content)
    return new Promise((resolve, reject) => {
        Client.insert(note, (error, response) => {
            if (error || response === undefined) {
                console.error(error)
                return reject({
                    code: error?.code || 500,
                    message: error?.message || "something went wrong"
                })
            }
            return resolve(response.toObject())
        })
    })
}

export const update = ({ name, content, title, id }: noteParams) => {
    const note = new Note()
    note.setName(name)
    note.setTitle(title)
    note.setContent(content)
    note.setId(id)

    return new Promise((resolve, reject) => {
        Client.update(note, (error, response) => {
            if (error || response === undefined) {
                console.error(error)
                return reject({
                    code: error?.code || 500,
                    message: error?.message || "something went wrong"
                })
            }
            return resolve(response.toObject())
        })
    })
}

export const get = ({ id }: getParams) => {
    const note = new NoteRequestId()
    note.setId(id)
    return new Promise((resolve, reject) => {
        Client.get(note, (error, response) => {
            if (error || response === undefined) {
                console.error(error)
                return reject({
                    code: error?.code || 500,
                    message: error?.message || "something went wrong"
                })
            }
            return resolve(response.toObject())
        })
    })
}