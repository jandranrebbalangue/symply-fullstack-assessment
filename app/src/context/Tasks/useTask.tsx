import React from "react"
import { taskContext } from "./taskContext"

export const useTask = () => {
  const context = React.useContext(taskContext)
  if (!context) {
    throw new Error("useTask must be used within an TaskProvider")
  }
  return context
}
