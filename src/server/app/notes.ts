import {
    sendUnaryData,
    Server,
    ServerCredentials,
    ServerUnaryCall
} from "@grpc/grpc-js"

import DB from "config/connectDB"
import notes, { Empty, Note, NoteArgs, NoteList } from "gen/proto/notes_pb"
import { noteType } from "config/types"
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
                message: "invalid input",
                details: "invalid input ",
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
    }
}