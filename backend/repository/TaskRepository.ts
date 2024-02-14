import { db } from "../db"
import { NewTask, Task, TaskUpdate } from "../db/types"

export async function findTaskById(id: number) {
  return await db
    .selectFrom("tasks")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst()
}

export async function findTask(criteria: Partial<Task>) {
  let query = db.selectFrom("tasks")

  if (criteria.id) {
    query = query.where("id", "=", criteria.id)
  }

  if (criteria.name) {
    query = query.where("name", "=", criteria.name)
  }

  if (criteria.status) {
    query = query.where("status", "=", criteria.status)
  }

  if (criteria.created_at) {
    query = query.where("created_at", "=", criteria.created_at)
  }

  return await query.selectAll().execute()
}

export async function updateTask(
  id: number,
  updateWith: TaskUpdate & { updated_at: string }
) {
  await db.updateTable("tasks").set(updateWith).where("id", "=", id).execute()
}

export async function createTask(task: NewTask) {
  return await db
    .insertInto("tasks")
    .values(task)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function deleteTask(id: number) {
  return await db
    .deleteFrom("tasks")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst()
}

export async function getAllTask() {
  return await db.selectFrom("tasks").selectAll().execute()
}
