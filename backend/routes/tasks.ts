import {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault
} from "fastify"
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import { Type } from "@sinclair/typebox"
import { } from "../repository"
import { NewTask } from "../db/types"
import {
  createTask,
  deleteTask,
  findTaskById,
  getAllTask,
  updateTask
} from "../repository/TaskRepository"

type FastifyTypeBox = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>

export async function Tasks(fastify: FastifyTypeBox): Promise<void> {
  fastify.get(
    "/tasks",
    {
      schema: {
        response: {
          200: Type.Array(
            Type.Object({
              id: Type.Number(),
              name: Type.String(),
              status: Type.String()
            })
          )
        }
      },
      onRequest: async (req) => {
        await req.jwtVerify()
      }
    },
    async (_req, reply) => {
      const tasks = await getAllTask()
      await reply.code(200).send(tasks)
    }
  )

  fastify.post(
    "/tasks",
    {
      schema: {
        body: Type.Object({
          name: Type.String(),
          status: Type.String()
        })
      },
      onRequest: async (req) => {
        await req.jwtVerify()
      }
    },
    async (req, reply) => {
      const { name, status } = req.body
      const created_at = new Date().toISOString()
      const data: NewTask = {
        name,
        status,
        created_at
      }

      const task = await createTask(data)
      await reply.code(201).send(task)
    }
  )
  fastify.get(
    "/tasks/:taskId",
    {
      schema: {
        params: Type.Object({
          taskId: Type.Number()
        })
      },
      onRequest: async (req) => {
        await req.jwtVerify()
      }
    },
    async (req, res) => {
      const { taskId } = req.params
      const task = await findTaskById(taskId)
      await res.code(200).send({ data: task })
    }
  )
  fastify.put(
    "/tasks/:taskId",
    {
      schema: {
        params: Type.Object({
          taskId: Type.Number()
        }),
        body: Type.Object({
          name: Type.String(),
          status: Type.String()
        })
      },
      onRequest: async (req) => {
        await req.jwtVerify()
      }
    },
    async (req, res) => {
      const { taskId } = req.params
      const { name, status } = req.body
      const updatedAt = new Date().toISOString()
      await updateTask(taskId, {
        name,
        status,
        updated_at: updatedAt
      })
      res.code(204)
    }
  )

  fastify.delete(
    "/tasks/:taskId",
    {
      schema: {
        params: Type.Object({
          taskId: Type.Number()
        })
      },
      onRequest: async (req) => {
        await req.jwtVerify()
      }
    },
    async (req, res) => {
      const { taskId } = req.params
      await deleteTask(taskId)
      res.code(204)
    }
  )
}
