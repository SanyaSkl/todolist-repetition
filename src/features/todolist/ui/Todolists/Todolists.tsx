import { TodolistItem } from "@/features/todolist/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { Grid, Paper } from "@mui/material"
import { useGetTodolistsQuery } from "@/features/todolist/api/todolistsApi.ts"

export const Todolists = () => {
  // Было:
  // const todolists = useAppSelector(selectTodolists)
  // const dispatch = useAppDispatch()
  // useEffect(() => {
  //   dispatch(fetchTodolistsTC())
  // }, [])

  const { data } = useGetTodolistsQuery()

  return (
    <>
      {data?.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
