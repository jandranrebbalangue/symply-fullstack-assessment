import * as z from "zod"
import wretch from "wretch"
import { NewTask } from "../../../backend/db/types"

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJwYXNzd29yZCI6InRlc3QxMjMiLCJpYXQiOjE3MDc5MDczNzF9.YWr10_OJBxPoouZ1cZS1S6Oh9zRDeIWFQKpk9Buvmo4"
const externalApi = wretch(import.meta.env.VITE_API_ENDPOINT).auth(
  `Bearer ${token}`
)
export const insertTask = async (newTask: NewTask) => {
  const schema = z.object({
    name: z.string(),
    status: z.string()
  })

  const task = await externalApi
    .url("/tasks")
    .json(newTask)
    .post()
    .json(schema.safeParse)

  return task
}

export const updateTask = async (
  taskId: string,
  updateWith: { status: string }
) => externalApi.url(`/tasks/${taskId}`).json(updateWith).put()

export const getTask = async (taskId: string) => {
  const schema = z.object({
    data: z.object({
      id: z.number(),
      name: z.string(),
      status: z.string(),
      createdAt: z.string().pipe(z.coerce.date()),
      updatedAt: z.nullable(z.string().pipe(z.coerce.date()))
    })
  })

  const task = await externalApi
    .url(`/products/${taskId}`)
    .get()
    .json(schema.safeParse)
  return task
}

export const deleteTask = async (taskId: string) =>
  externalApi
    .url(`/tasks/${taskId}`)
    .delete()
    .res(() => true)
