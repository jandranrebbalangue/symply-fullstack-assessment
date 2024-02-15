import { useEffect, useState } from "react"
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material"
import { TodosProps } from "../types"
import { updateStatus } from "../api/api"
import { useTask } from "../context/Tasks/useTask"
import toast from "react-hot-toast"

const TableTasks = () => {
  const { setDeleteId, setOpenConfirmDialog } = useTask()
  const [data, setData] = useState<TodosProps[]>([
    {
      id: 0,
      name: "",
      status: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: new Date().toISOString()
    }
  ])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    let cancel = false
    const getData = async () => {
      setIsLoading(true)
      const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/tasks`)
      const json = await res.json()
      if (cancel) return
      setData(json)
      setIsLoading(false)
    }
    getData()
    return () => {
      cancel = true
    }
  }, [])

  if (isLoading) return <CircularProgress />

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item: TodosProps) => (
              <TableRow key={item.id}>
                <TableCell
                  style={{
                    textDecorationLine:
                      item.status === "Complete" ? "line-through" : "none"
                  }}
                >
                  {item.name}
                </TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={async () => {
                      if (item.status !== "Complete") {
                        await updateStatus(`${item.id}`, {
                          status: "Complete",
                          name: item.name
                        })
                        toast.success("Successfully updated", {
                          duration: 5000
                        })
                      } else {
                        await updateStatus(`${item.id}`, {
                          status: "Not Complete",
                          name: item.name
                        })

                        toast.success("Successfully updated", {
                          duration: 5000
                        })
                      }
                    }}
                    variant="contained"
                  >
                    {item.status === "Complete" ? "Not Complete" : "Complete"}
                  </Button>
                  <Button
                    onClick={() => {
                      setOpenConfirmDialog(true)
                      setDeleteId(item.id)
                    }}
                    variant="contained"
                    color="error"
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
export default TableTasks
