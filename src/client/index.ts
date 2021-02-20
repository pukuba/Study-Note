import express from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { BFFPort } from "config/env"
import { list, insert, update, get, del } from "client/rpc"
import { noteParams, noteType, getParams } from "config/types"
import cors from "cors"
import bodyParser from "body-parser"
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get("/", ({ }, res) => {
    res.json({ health: "ok" })
})

app.get<ParamsDictionary, any, any, void>(
    "/lists",
    async (req, res) => {
        try {
            const result = await list()
            return res.json({ result })
        } catch (error) {
            return res.status(500).json({ error })
        }
    }
)

app.get<ParamsDictionary, any, any, getParams>(
    "/list",
    async (req, res) => {
        try {
            const result = await get({ id: req.query.id })
            return res.json({ result })
        } catch (error) {
            return res.status(500).json({ error })
        }
    }
)

app.delete<ParamsDictionary, any, any, getParams>(
    "/list",
    async (req, res) => {
        try {
            const result = await del({ id: req.query.id })
            return res.json({ result })
        } catch (error) {
            return res.status(500).json({ error })
        }
    }
)

app.post<ParamsDictionary, any, any, noteParams>(
    "/insert",
    async (req, res) => {
        if (req.body.name === undefined || req.body.title === undefined || req.body.content === undefined) {
            return res.status(400).json({
                error: "invalid input"
            })
        }
        try {
            const result = await insert({
                name: req.body.name,
                title: req.body.title,
                content: req.body.content
            })
            return res.json({ result })
        } catch {
            return res.status(400).json({
                error: "invalid input"
            })
        }
    }
)

app.post<ParamsDictionary, any, any, noteType>(
    "/update",
    async (req, res) => {
        try {
            const result = await update({
                id: req.body.id,
                name: req.body.name,
                title: req.body.title,
                content: req.body.content
            })
            return res.json({ result })
        } catch {
            return res.status(400).json({
                error: "invalid input"
            })
        }
    }
)

app.listen(BFFPort, () =>
    console.log(`Express server listening on port http://localhost:${BFFPort}`)
)