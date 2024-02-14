import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material"
import { TodosProps } from "../types"

const TableTasks = () => {
  const data: TodosProps[] = [
    {
      id: 1,
      name: "Test",
      status: "Completed",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: new Date().toISOString()
    }
  ]
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
                      item.status === "Completed" ? "line-through" : "none"
                  }}
                >
                  {item.name}
                </TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={async () => {
                      /* await updateStatus(item.id, { status: "Completed" }) */
                      /* await mutate("/tasks") */
                    }}
                    disabled={item.status === "Completed" ? true : false}
                    variant="contained"
                  >
                    Complete
                  </Button>
                  <Button
                    onClick={() => {
                      /* setOpenConfirmDialog(true) */
                      /* setDeleteId(item.id) */
                    }}
                    variant="contained"
                    color="error"
                    style={{ marginLeft: "10px" }}
                    disabled={item.status === "Completed" ? true : false}
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
