import {
    sendUnaryData,
    ServerUnaryCall
} from "@grpc/grpc-js"

import DB from "config/connectDB"
import { Empty, Note, NoteArgs, NoteList } from "gen/proto/notes_pb"
import { noteType } from "config/types"
import { ObjectId } from "mongodb"

export default {
    list: async (call: ServerUnaryCall<Empty, NoteList>, callback: sendUnaryData<NoteList>) => {
        const db = await DB.get()
        const result = await db.collection("post").find().toArray()
        const resultNotes = new NoteList()
        result.forEach((x: noteType) => {
            const res = new Note()
            res.setId(x._id + "")
            res.setName(x.name)
            res.setTitle(x.title)
            res.setContent(x.content)
            resultNotes.addNotes(res)
        })
        return callback(null, resultNotes)
    },
    insert: async (call: ServerUnaryCall<NoteArgs, Note>, callback: sendUnaryData<Note>) => {
        const db = await DB.get()
        const resultNote = new Note()
        if (!call.request.getName() || !call.request.getTitle() || !call.request.getContent()) {
            return callback({
                code: 400,
                message: "invalid input"
            })
        }
        const { _id } = await db.collection("post").insertOne({
            name: call.request.getName(),
            title: call.request.getTitle(),
            content: call.request.getContent()
        })
        resultNote.setId(_id)
        resultNote.setContent(call.request.getContent())
        resultNote.setTitle(call.request.getTitle())
        resultNote.setName(call.request.getName())
        return callback(null, resultNote)
    },
    update: async (call: ServerUnaryCall<Note, Note>, callback: sendUnaryData<Note>) => {
        const db = await DB.get()
        if (call.request.getId() === undefined) {
            return callback({
                code: 400,
                message: "empty id"
            })
        }
        const resultNote = new Note()
        const post = await db.collection("post").findOne({ _id: new ObjectId(call.request.getId()) })
        if (post === null) {
            return callback({
                code: 400,
                message: "not valid id"
            })
        }
        console.log(post)
        await db.collection("post").updateOne({ _id: post._id }, {
            $set: {
                title: call.request.getTitle() || post.title,
                name: call.request.getName() || post.name,
                content: call.request.getContent() || post.content
            }
        })
        resultNote.setId(post._id + "")
        resultNote.setTitle(call.request.getTitle() || post.title)
        resultNote.setName(call.request.getName() || post.name)
        resultNote.setContent(call.request.getContent() || post.content)
        return callback(null, resultNote)
    }
}