import {
    sendUnaryData,
    Server,
    ServerCredentials,
    ServerUnaryCall,
} from "@grpc/grpc-js"
import DB from "config/connectDB"
import notes, { Empty, Note, NoteArgs, NoteList } from "gen/proto/notes_pb"
import { noteType } from "config/types"
export default {
    list: async (call: ServerUnaryCall<Empty, NoteList>, callback: sendUnaryData<NoteList>) => {
        const db = await DB.get()
        const result = await db.collection("post").find().toArray()
        const resultNotes = new NoteList()
        if (result.length > 0) {
            result.forEach((x: noteType) => {
                const res = new Note()
                res.setId(x._id + "")
                res.setName(x.name)
                res.setTitle(x.title)
                res.setContent(x.content)
                resultNotes.addNotes(res)
            })
        }
        callback(null, resultNotes)
    },
    insert: async (call: ServerUnaryCall<NoteArgs, Note>, callback: sendUnaryData<Note>) => {
        const db = await DB.get()
        if (!call.request.getName() || !call.request.getTitle() || !call.request.getContent()) {
            throw new Error("args empty")
        }
        const { _id } = await db.collection("post").insertOne({
            name: call.request.getName(),
            title: call.request.getTitle(),
            content: call.request.getContent()
        })
        const resultNote = new Note()
        resultNote.setId(_id)
        resultNote.setContent(call.request.getContent())
        resultNote.setTitle(call.request.getTitle())
        resultNote.setName(call.request.getName())
        callback(null, resultNote)
    }
}