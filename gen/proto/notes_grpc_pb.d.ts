// package: 
// file: proto/notes.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as proto_notes_pb from "../proto/notes_pb";

interface INoteServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    list: INoteServiceService_Ilist;
    get: INoteServiceService_Iget;
    insert: INoteServiceService_Iinsert;
    update: INoteServiceService_Iupdate;
    delete: INoteServiceService_Idelete;
}

interface INoteServiceService_Ilist extends grpc.MethodDefinition<proto_notes_pb.Empty, proto_notes_pb.NoteList> {
    path: "/NoteService/list";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<proto_notes_pb.Empty>;
    requestDeserialize: grpc.deserialize<proto_notes_pb.Empty>;
    responseSerialize: grpc.serialize<proto_notes_pb.NoteList>;
    responseDeserialize: grpc.deserialize<proto_notes_pb.NoteList>;
}
interface INoteServiceService_Iget extends grpc.MethodDefinition<proto_notes_pb.NoteRequestId, proto_notes_pb.Note> {
    path: "/NoteService/get";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<proto_notes_pb.NoteRequestId>;
    requestDeserialize: grpc.deserialize<proto_notes_pb.NoteRequestId>;
    responseSerialize: grpc.serialize<proto_notes_pb.Note>;
    responseDeserialize: grpc.deserialize<proto_notes_pb.Note>;
}
interface INoteServiceService_Iinsert extends grpc.MethodDefinition<proto_notes_pb.NoteArgs, proto_notes_pb.Note> {
    path: "/NoteService/insert";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<proto_notes_pb.NoteArgs>;
    requestDeserialize: grpc.deserialize<proto_notes_pb.NoteArgs>;
    responseSerialize: grpc.serialize<proto_notes_pb.Note>;
    responseDeserialize: grpc.deserialize<proto_notes_pb.Note>;
}
interface INoteServiceService_Iupdate extends grpc.MethodDefinition<proto_notes_pb.Note, proto_notes_pb.Note> {
    path: "/NoteService/update";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<proto_notes_pb.Note>;
    requestDeserialize: grpc.deserialize<proto_notes_pb.Note>;
    responseSerialize: grpc.serialize<proto_notes_pb.Note>;
    responseDeserialize: grpc.deserialize<proto_notes_pb.Note>;
}
interface INoteServiceService_Idelete extends grpc.MethodDefinition<proto_notes_pb.NoteRequestId, proto_notes_pb.Empty> {
    path: "/NoteService/delete";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<proto_notes_pb.NoteRequestId>;
    requestDeserialize: grpc.deserialize<proto_notes_pb.NoteRequestId>;
    responseSerialize: grpc.serialize<proto_notes_pb.Empty>;
    responseDeserialize: grpc.deserialize<proto_notes_pb.Empty>;
}

export const NoteServiceService: INoteServiceService;

export interface INoteServiceServer extends grpc.UntypedServiceImplementation {
    list: grpc.handleUnaryCall<proto_notes_pb.Empty, proto_notes_pb.NoteList>;
    get: grpc.handleUnaryCall<proto_notes_pb.NoteRequestId, proto_notes_pb.Note>;
    insert: grpc.handleUnaryCall<proto_notes_pb.NoteArgs, proto_notes_pb.Note>;
    update: grpc.handleUnaryCall<proto_notes_pb.Note, proto_notes_pb.Note>;
    delete: grpc.handleUnaryCall<proto_notes_pb.NoteRequestId, proto_notes_pb.Empty>;
}

export interface INoteServiceClient {
    list(request: proto_notes_pb.Empty, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.NoteList) => void): grpc.ClientUnaryCall;
    list(request: proto_notes_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.NoteList) => void): grpc.ClientUnaryCall;
    list(request: proto_notes_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.NoteList) => void): grpc.ClientUnaryCall;
    get(request: proto_notes_pb.NoteRequestId, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Note) => void): grpc.ClientUnaryCall;
    get(request: proto_notes_pb.NoteRequestId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Note) => void): grpc.ClientUnaryCall;
    get(request: proto_notes_pb.NoteRequestId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Note) => void): grpc.ClientUnaryCall;
    insert(request: proto_notes_pb.NoteArgs, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Note) => void): grpc.ClientUnaryCall;
    insert(request: proto_notes_pb.NoteArgs, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Note) => void): grpc.ClientUnaryCall;
    insert(request: proto_notes_pb.NoteArgs, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Note) => void): grpc.ClientUnaryCall;
    update(request: proto_notes_pb.Note, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Note) => void): grpc.ClientUnaryCall;
    update(request: proto_notes_pb.Note, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Note) => void): grpc.ClientUnaryCall;
    update(request: proto_notes_pb.Note, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Note) => void): grpc.ClientUnaryCall;
    delete(request: proto_notes_pb.NoteRequestId, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Empty) => void): grpc.ClientUnaryCall;
    delete(request: proto_notes_pb.NoteRequestId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Empty) => void): grpc.ClientUnaryCall;
    delete(request: proto_notes_pb.NoteRequestId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Empty) => void): grpc.ClientUnaryCall;
}

export class NoteServiceClient extends grpc.Client implements INoteServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public list(request: proto_notes_pb.Empty, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.NoteList) => void): grpc.ClientUnaryCall;
    public list(request: proto_notes_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.NoteList) => void): grpc.ClientUnaryCall;
    public list(request: proto_notes_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.NoteList) => void): grpc.ClientUnaryCall;
    public get(request: proto_notes_pb.NoteRequestId, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Note) => void): grpc.ClientUnaryCall;
    public get(request: proto_notes_pb.NoteRequestId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Note) => void): grpc.ClientUnaryCall;
    public get(request: proto_notes_pb.NoteRequestId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Note) => void): grpc.ClientUnaryCall;
    public insert(request: proto_notes_pb.NoteArgs, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Note) => void): grpc.ClientUnaryCall;
    public insert(request: proto_notes_pb.NoteArgs, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Note) => void): grpc.ClientUnaryCall;
    public insert(request: proto_notes_pb.NoteArgs, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Note) => void): grpc.ClientUnaryCall;
    public update(request: proto_notes_pb.Note, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Note) => void): grpc.ClientUnaryCall;
    public update(request: proto_notes_pb.Note, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Note) => void): grpc.ClientUnaryCall;
    public update(request: proto_notes_pb.Note, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Note) => void): grpc.ClientUnaryCall;
    public delete(request: proto_notes_pb.NoteRequestId, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Empty) => void): grpc.ClientUnaryCall;
    public delete(request: proto_notes_pb.NoteRequestId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Empty) => void): grpc.ClientUnaryCall;
    public delete(request: proto_notes_pb.NoteRequestId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_notes_pb.Empty) => void): grpc.ClientUnaryCall;
}
