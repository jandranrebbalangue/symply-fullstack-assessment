import React from "react"

interface TaskContext {
  deleteId: number
  setDeleteId: (deleteId: number) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  openConfirmDialog: boolean
  setOpenConfirmDialog: (openConfirmDialog: boolean) => void
}

export const taskContext = React.createContext<TaskContext>({
  deleteId: 0,
  setDeleteId: () => null,
  openConfirmDialog: false,
  setOpenConfirmDialog: () => null,
  isLoading: false,
  setIsLoading: () => null
})
