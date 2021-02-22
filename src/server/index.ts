import {
    Server,
    ServerCredentials,
} from "@grpc/grpc-js"
import dotenv from "dotenv"
dotenv.config()
import { NoteServiceService } from "gen/proto/notes_grpc_pb"
import rpc from "server/app/notes"

const server = new Server()
server.addService(NoteServiceService, {
    list: rpc.list,
    insert: rpc.insert,
    update: rpc.update,
    get: rpc.get,
    delete: rpc.delete
})

server.bindAsync('127.0.0.1:50051', ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.error(error)
    }

    server.start()
    console.log(`server start listing on port localhost:${port}`)
})