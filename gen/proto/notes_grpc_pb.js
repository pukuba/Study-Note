// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_notes_pb = require('../proto/notes_pb.js');

function serialize_Empty(arg) {
  if (!(arg instanceof proto_notes_pb.Empty)) {
    throw new Error('Expected argument of type Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Empty(buffer_arg) {
  return proto_notes_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Note(arg) {
  if (!(arg instanceof proto_notes_pb.Note)) {
    throw new Error('Expected argument of type Note');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Note(buffer_arg) {
  return proto_notes_pb.Note.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_NoteArgs(arg) {
  if (!(arg instanceof proto_notes_pb.NoteArgs)) {
    throw new Error('Expected argument of type NoteArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_NoteArgs(buffer_arg) {
  return proto_notes_pb.NoteArgs.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_NoteList(arg) {
  if (!(arg instanceof proto_notes_pb.NoteList)) {
    throw new Error('Expected argument of type NoteList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_NoteList(buffer_arg) {
  return proto_notes_pb.NoteList.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_NoteRequestId(arg) {
  if (!(arg instanceof proto_notes_pb.NoteRequestId)) {
    throw new Error('Expected argument of type NoteRequestId');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_NoteRequestId(buffer_arg) {
  return proto_notes_pb.NoteRequestId.deserializeBinary(new Uint8Array(buffer_arg));
}


var NoteServiceService = exports.NoteServiceService = {
  list: {
    path: '/NoteService/list',
    requestStream: false,
    responseStream: false,
    requestType: proto_notes_pb.Empty,
    responseType: proto_notes_pb.NoteList,
    requestSerialize: serialize_Empty,
    requestDeserialize: deserialize_Empty,
    responseSerialize: serialize_NoteList,
    responseDeserialize: deserialize_NoteList,
  },
  get: {
    path: '/NoteService/get',
    requestStream: false,
    responseStream: false,
    requestType: proto_notes_pb.NoteRequestId,
    responseType: proto_notes_pb.Note,
    requestSerialize: serialize_NoteRequestId,
    requestDeserialize: deserialize_NoteRequestId,
    responseSerialize: serialize_Note,
    responseDeserialize: deserialize_Note,
  },
  insert: {
    path: '/NoteService/insert',
    requestStream: false,
    responseStream: false,
    requestType: proto_notes_pb.NoteArgs,
    responseType: proto_notes_pb.Note,
    requestSerialize: serialize_NoteArgs,
    requestDeserialize: deserialize_NoteArgs,
    responseSerialize: serialize_Note,
    responseDeserialize: deserialize_Note,
  },
  update: {
    path: '/NoteService/update',
    requestStream: false,
    responseStream: false,
    requestType: proto_notes_pb.Note,
    responseType: proto_notes_pb.Note,
    requestSerialize: serialize_Note,
    requestDeserialize: deserialize_Note,
    responseSerialize: serialize_Note,
    responseDeserialize: deserialize_Note,
  },
  delete: {
    path: '/NoteService/delete',
    requestStream: false,
    responseStream: false,
    requestType: proto_notes_pb.NoteRequestId,
    responseType: proto_notes_pb.Empty,
    requestSerialize: serialize_NoteRequestId,
    requestDeserialize: deserialize_NoteRequestId,
    responseSerialize: serialize_Empty,
    responseDeserialize: deserialize_Empty,
  },
};

exports.NoteServiceClient = grpc.makeGenericClientConstructor(NoteServiceService);
