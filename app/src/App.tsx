import { useState } from "react"
import { CircularProgress } from "@mui/material"
import toast, { Toaster } from "react-hot-toast"
import { mutate } from "swr"
import FormDialog from "./components/FormDialog"
import TableTasks from "./components/TableTask"
import { useTask } from "./context/Tasks/useTask"
import ConfirmationDialog from "./components/ConfirmDialog"
import { deleteTask } from "./api/api"

function App() {
  const [open, setOpen] = useState(false)
  const {
    deleteId,
    openConfirmDialog,
    setOpenConfirmDialog,
    setIsLoading,
    isLoading
  } = useTask()
  const handleOpen = () => setOpen((prev) => !prev)
  const handleClose = () => setOpen(false)
  const handleCancel = () => setOpenConfirmDialog(false)
  const deleteCurrentTask = async () => {
    await deleteTask(`${deleteId}`)
    setIsLoading(true)
    setOpenConfirmDialog(false)
    setIsLoading(false)
    toast.error("Delete successfully", {
      duration: 5000
    })
    mutate("/tasks")
  }
  if (isLoading) return <CircularProgress />
  return (
    <>
      <Toaster position="top-right" />
      <FormDialog
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      <TableTasks />
      {openConfirmDialog && (
        <ConfirmationDialog
          deleteTask={deleteCurrentTask}
          open={openConfirmDialog}
          handleCancel={handleCancel}
        />
      )}
    </>
  )
}

export default App
