import { ObjectId } from "mongodb";

export type noteType = {
    _id: ObjectId
    name: string
    title: string
    content: string
}

export type insertParams = {
    name: string
    title: string
    content: string
}

export type noteParams = {
    name: string
    title: string
    id: string
    content: string
}

export type getParams = {
    id: string
}