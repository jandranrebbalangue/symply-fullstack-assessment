import { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely"

export interface Database {
  tasks: TaskTable
}

export interface TaskTable {
  id: Generated<number>
  name: string
  status: string
  created_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, never>
}

export type Task = Selectable<TaskTable>
export type NewTask = Insertable<TaskTable>
export type TaskUpdate = Updateable<TaskTable>
