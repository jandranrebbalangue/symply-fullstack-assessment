import { test, t } from "tap"
import { Response } from "light-my-request"
import app from "../app"
import { db } from "../db"
import { Task } from "../db/types"
import tasks from "./fixtures/fixtures.json"

t.before(async () => {
  await db.deleteFrom("tasks").returningAll().executeTakeFirst()
})

t.after(() => {
  app.close()
})

test("Tasks", async (t) => {
  const items: Task[] = []
  t.test("Create", async (t) => {
    const promises: Promise<Response>[] = []
    tasks.forEach((item) => {
      promises.push(
        app.inject({
          method: "POST",
          url: "/tasks",
          body: item,
        })
      )
    })

    await Promise.all(promises).then((val) => {
      val.forEach((item) => {
        items.push(item.json())
        t.equal(item.statusCode, 201)
      })
    })
  })

  t.test("List", async (t) => {
    const response = await app.inject({
      method: "GET",
      url: "/tasks",
    })
    t.equal(response.statusCode, 200)
    t.ok(response.json()[0], items[0])
  })

  t.test("Read", async (t) => {
    const { id } = items[0]
    const response = await app.inject({
      method: "GET",
      url: `/tasks/${id}`,
    })

    t.equal(response.statusCode, 200)
    t.ok(response.json().data, items[0])
  })

  t.test("Update", async (t) => {
    const { id, name } = items[0]
    const response = await app.inject({
      method: "PUT",
      url: `/tasks/${id}`,
      body: {
        name,
        status: "Completed",
        updatedAt: new Date().toISOString()
      },
    })

    const task = await app.inject({
      method: "GET",
      url: `/tasks/${id}`,
    })
    t.equal(response.statusCode, 204)
    t.ok(task.json().data.status, "Completed")
  })

  t.test("Delete", async (t) => {
    const { id } = items[1]
    const response = await app.inject({
      method: "DELETE",
      url: `/tasks/${id}`,
    })

    t.equal(response.statusCode, 204)
  })
})
