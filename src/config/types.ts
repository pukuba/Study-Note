import { ObjectId } from "mongodb";

export interface noteType {
    _id: ObjectId
    name: string
    title: string
    content: string
}

export type noteParams = {
    name: string
    title: string
    content: string
}
