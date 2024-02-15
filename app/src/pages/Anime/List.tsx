import { useEffect, useState } from "react"
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material"
import { AnimeProps } from "../../types"

const List = () => {
  const [data, setData] = useState<AnimeProps[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    let cancel = false
    const getData = async () => {
      setIsLoading(true)
      const res = await fetch(`https://animechan.xyz/api/quotes`)
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
              <TableCell>ID</TableCell>
              <TableCell>Quote</TableCell>
              <TableCell>Anime</TableCell>
              <TableCell>Character</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item: AnimeProps) => (
              <TableRow key={item.id}>
                <TableCell>{item.quote}</TableCell>
                <TableCell>{item.anime}</TableCell>
                <TableCell>{item.character}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
export default List
