export type TodosProps = {
  id: number
  name: string
  status: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}
export type AddTaskProps = {
  name: string
  status: string
}

export type UpdateStatusProps = {
  status: string
}
