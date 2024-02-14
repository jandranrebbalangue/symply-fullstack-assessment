import fastify from "fastify"
import http from "http"
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import dotenv from "dotenv"
import cors from "@fastify/cors"
import { Tasks } from "./routes"
dotenv.config()

const app = fastify<http.Server, http.IncomingMessage>({
  logger: true
}).withTypeProvider<TypeBoxTypeProvider>()

app.register(cors, {
  origin: (origin, cb) => {
    const hostname = new URL(origin as string).hostname
    if (hostname === "localhost") {
      cb(null, true)
      return
    }
    cb(new Error("Not allowed"), false)
  }
})

app.register(Tasks)

export default app
