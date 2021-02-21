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
        const dbResult = await db.collection("post").find().toArray()
        const resultNotes = new NoteList()
        dbResult.forEach((x: noteType) => {
            const resultNote = new Note()
            resultNote.setId(x._id + "")
            resultNote.setName(x.name)
            resultNote.setTitle(x.title)
            resultNote.setContent(x.content)
            resultNotes.addNotes(resultNote)
        })
        return callback(null, resultNotes)
    },
    insert: async (call: ServerUnaryCall<NoteArgs, Note>, callback: sendUnaryData<Note>) => {
        if (isValidInsert(call) === false) {
            return callback({
                code: 400,
                message: "invalid input"
            })
        }
        const db = await DB.get()
        const resultNote = new Note()
        const { insertedId } = await db.collection("post").insertOne({
            name: call.request.getName(),
            title: call.request.getTitle(),
            content: call.request.getContent()
        })
        resultNote.setId(insertedId + "")
        resultNote.setContent(call.request.getContent())
        resultNote.setTitle(call.request.getTitle())
        resultNote.setName(call.request.getName())
        return callback(null, resultNote)
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
            const resultNote = new Note()
            resultNote.setId(dbResult._id + "")
            resultNote.setTitle(call.request.getTitle() || dbResult.title)
            resultNote.setName(call.request.getName() || dbResult.name)
            resultNote.setContent(call.request.getContent() || dbResult.content)
            return callback(null, resultNote)
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
            const resultNote = new Note()
            resultNote.setId(dbResult._id + "")
            resultNote.setTitle(dbResult.title)
            resultNote.setName(dbResult.name)
            resultNote.setContent(dbResult.content)
            return callback(null, resultNote)
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
            return callback(null, new Empty())
        } catch {
            return callback({
                code: 400,
                message: "ID not valid"
            })
        }
    }
}