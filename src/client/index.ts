import express from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { BFFPort } from "config/env"
import { list, insert } from "client/rpc"
import { noteParams } from "config/types"
const app = express()

app.get("/", ({ }, res) => {
    res.json({ health: "ok" })
})

app.get<ParamsDictionary, any, any, void>(
    "/list",
    async (request, response) => {

        try {
            const result = await list()
            response.json({ result })
        } catch (error) {
            response.status(500).json({ error })
        }
    }
)

app.get<ParamsDictionary, any, any, noteParams>(
    "/insert",
    async (request, response) => {
        try {
            const result = await insert({ ...request.query })
            response.json({ result })
        } catch (error) {
            response.status(500).json({ error })
        }
    }
)

app.listen(BFFPort, () =>
    console.log(`Express server listening on port http://localhost:${BFFPort}`)
)