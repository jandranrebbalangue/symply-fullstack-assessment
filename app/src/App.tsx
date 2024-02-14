import { useState } from "react"
import FormDialog from "./components/FormDialog"
import TableTasks from "./components/TableTask"

function App() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen((prev) => !prev)
  const handleClose = () => setOpen(false)
  return (
    <>
      <FormDialog
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      <TableTasks />
    </>
  )
}

export default App
