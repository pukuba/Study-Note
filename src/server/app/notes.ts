import {
    sendUnaryData,
    ServerUnaryCall
} from "@grpc/grpc-js"

import DB from "config/connectDB"
import { Empty, Note, NoteArgs, NoteList, NoteRequestId } from "gen/proto/notes_pb"
import { noteType } from "config/types"
import { ObjectId } from "mongodb"

const isValidInsert = (call: ServerUnaryCall<NoteArgs, Note>) => {
    if (call.request.toArray().filter(e => e).length !== 3) {
        return false
    }
    return true
}

export default {
    list: async (call: ServerUnaryCall<Empty, NoteList>, callback: sendUnaryData<NoteList>) => {
        const db = await DB.get()
        const posts = await db.collection("post").find().toArray()
        const response = new NoteList()
        posts.forEach((x: noteType) => {
            const loopNote = new Note()
            loopNote.setId(x._id + "")
            loopNote.setName(x.name)
            loopNote.setTitle(x.title)
            loopNote.setContent(x.content)
            response.addNotes(loopNote)
        })
        return callback(null, response)
    },
    insert: async (call: ServerUnaryCall<NoteArgs, Note>, callback: sendUnaryData<Note>) => {
        if (isValidInsert(call) === false) {
            return callback({
                code: 400,
                message: "invalid input"
            })
        }
        const db = await DB.get()
        const response = new Note()
        const { insertedId } = await db.collection("post").insertOne({
            name: call.request.getName(),
            title: call.request.getTitle(),
            content: call.request.getContent()
        })
        response.setId(insertedId + "")
        response.setContent(call.request.getContent())
        response.setTitle(call.request.getTitle())
        response.setName(call.request.getName())
        return callback(null, response)
    },
    update: async (call: ServerUnaryCall<Note, Note>, callback: sendUnaryData<Note>) => {
        const db = await DB.get()
        try {
            const dbResult = await db.collection("post").findOne({ _id: new ObjectId(call.request.getId()) })
            await db.collection("post").updateOne({ _id: dbResult._id }, {
                $set: {
                    title: call.request.getTitle() || dbResult.title,
                    name: call.request.getName() || dbResult.name,
                    content: call.request.getContent() || dbResult.content
                }
            })
            const response = new Note()
            response.setId(dbResult._id + "")
            response.setTitle(call.request.getTitle() || dbResult.title)
            response.setName(call.request.getName() || dbResult.name)
            response.setContent(call.request.getContent() || dbResult.content)
            return callback(null, response)
        } catch {
            return callback({
                code: 400,
                message: "ID not valid"
            })
        }
    },
    get: async (call: ServerUnaryCall<NoteRequestId, Note>, callback: sendUnaryData<Note>) => {
        const db = await DB.get()
        try {
            const dbResult = await db.collection("post").findOne({ _id: new ObjectId(call.request.getId()) })
            const response = new Note()
            response.setId(dbResult._id + "")
            response.setTitle(dbResult.title)
            response.setName(dbResult.name)
            response.setContent(dbResult.content)
            return callback(null, response)
        } catch {
            return callback({
                code: 400,
                message: "ID not valid"
            })
        }
    },
    delete: async (call: ServerUnaryCall<NoteRequestId, Empty>, callback: sendUnaryData<Empty>) => {
        const db = await DB.get()
        try {
            await db.collection("post").deleteOne({ _id: new ObjectId(call.request.getId()) })
            const response = new Empty()
            return callback(null, response)
        } catch {
            return callback({
                code: 400,
                message: "ID not valid"
            })
        }
    }
}