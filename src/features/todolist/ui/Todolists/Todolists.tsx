import { TodolistItem } from "@/features/todolist/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { Box, Grid, Paper } from "@mui/material"
import { useGetTodolistsQuery } from "@/features/todolist/api/todolistsApi.ts"
import { containerSx } from "@/common/Styles"
import { TodolistSkeleton } from "@/features/todolist/ui/Todolists/TodolistSkeleton/TodolistSkeleton.tsx"

export const Todolists = () => {
  // Было:
  // const todolists = useAppSelector(selectTodolists)
  // const dispatch = useAppDispatch()
  // useEffect(() => {
  //   dispatch(fetchTodolistsTC())
  // }, [])

  const { data: todolists, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <Box sx={containerSx} style={{ gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    )
  }

  return (
    <>
      {todolists?.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
