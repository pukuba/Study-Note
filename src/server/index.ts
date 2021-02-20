import {
    sendUnaryData,
    Server,
    ServerCredentials,
    ServerUnaryCall,
} from "@grpc/grpc-js"
import DB from "config/connectDB"
import { NoteServiceService } from "gen/proto/notes_grpc_pb"
import notes from "gen/proto/notes_pb"

const req = new notes.NoteList()

const server = new Server()
server.addService(NoteServiceService, {
    list: (call: ServerUnaryCall<notes.Empty, notes.NoteList>, callback: sendUnaryData<notes.NoteList>) => {
        callback(null, req)
    }
})

server.bindAsync('127.0.0.1:50051', ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.error(error)
    }

    server.start()
    console.log(`server start listing on port http://localhost:${port}`)
})