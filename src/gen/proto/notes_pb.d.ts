// package: 
// file: proto/notes.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Empty extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Empty.AsObject;
    static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Empty;
    static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
    export type AsObject = {
    }
}

export class Note extends jspb.Message { 
    getId(): string;
    setId(value: string): Note;

    getName(): string;
    setName(value: string): Note;

    getTitle(): string;
    setTitle(value: string): Note;

    getContent(): string;
    setContent(value: string): Note;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Note.AsObject;
    static toObject(includeInstance: boolean, msg: Note): Note.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Note, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Note;
    static deserializeBinaryFromReader(message: Note, reader: jspb.BinaryReader): Note;
}

export namespace Note {
    export type AsObject = {
        id: string,
        name: string,
        title: string,
        content: string,
    }
}

export class NoteArgs extends jspb.Message { 
    getName(): string;
    setName(value: string): NoteArgs;

    getTitle(): string;
    setTitle(value: string): NoteArgs;

    getContent(): string;
    setContent(value: string): NoteArgs;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NoteArgs.AsObject;
    static toObject(includeInstance: boolean, msg: NoteArgs): NoteArgs.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NoteArgs, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NoteArgs;
    static deserializeBinaryFromReader(message: NoteArgs, reader: jspb.BinaryReader): NoteArgs;
}

export namespace NoteArgs {
    export type AsObject = {
        name: string,
        title: string,
        content: string,
    }
}

export class NoteList extends jspb.Message { 
    clearNotesList(): void;
    getNotesList(): Array<Note>;
    setNotesList(value: Array<Note>): NoteList;
    addNotes(value?: Note, index?: number): Note;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NoteList.AsObject;
    static toObject(includeInstance: boolean, msg: NoteList): NoteList.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NoteList, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NoteList;
    static deserializeBinaryFromReader(message: NoteList, reader: jspb.BinaryReader): NoteList;
}

export namespace NoteList {
    export type AsObject = {
        notesList: Array<Note.AsObject>,
    }
}

export class NoteRequestId extends jspb.Message { 
    getId(): string;
    setId(value: string): NoteRequestId;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NoteRequestId.AsObject;
    static toObject(includeInstance: boolean, msg: NoteRequestId): NoteRequestId.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NoteRequestId, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NoteRequestId;
    static deserializeBinaryFromReader(message: NoteRequestId, reader: jspb.BinaryReader): NoteRequestId;
}

export namespace NoteRequestId {
    export type AsObject = {
        id: string,
    }
}
