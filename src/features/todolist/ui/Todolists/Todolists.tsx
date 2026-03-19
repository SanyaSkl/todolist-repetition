import { TodolistItem } from "@/features/todolist/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { Grid, Paper } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { useEffect } from "react"
import { fetchTodolistsTC, selectTodolists } from "@/features/todolist/model/todolists-slice.ts"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <>
      {todolists.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
