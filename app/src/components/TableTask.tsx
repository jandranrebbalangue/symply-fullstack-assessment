import {
  Button,
  Checkbox,
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
import { fetcher } from "../utils/fetcher"
import useSWR, { mutate } from "swr"

const TableTasks = () => {
  const { data, isLoading } = useSWR<TodosProps[]>("/tasks", fetcher)
  const { setDeleteId, setOpenConfirmDialog } = useTask()

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
                  <Checkbox
                    onClick={async () => {
                      if (item.status !== "Complete") {
                        await updateStatus(`${item.id}`, {
                          status: "Complete",
                          name: item.name
                        })
                        toast.success("Successfully updated", {
                          duration: 5000
                        })
                        await mutate("/tasks")
                      }

                      if (item.status === "Complete") {
                        await updateStatus(`${item.id}`, {
                          status: "Not Complete",
                          name: item.name
                        })
                        toast.success("Successfully updated", {
                          duration: 5000
                        })
                        await mutate("/tasks")
                      }
                    }}
                    defaultChecked={item.status === "Complete" ? true : false}
                    value={item.status}
                  />
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
