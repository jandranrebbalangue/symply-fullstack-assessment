import React from "react"
import { taskContext } from "./taskContext"

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [deleteId, setDeleteId] = React.useState<number>(0)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [openConfirmDialog, setOpenConfirmDialog] =
    React.useState<boolean>(false)

  return (
    <taskContext.Provider
      value={{
        deleteId,
        setDeleteId,
        setOpenConfirmDialog,
        openConfirmDialog,
        setIsLoading,
        isLoading
      }}
    >
      {children}
    </taskContext.Provider>
  )
}
