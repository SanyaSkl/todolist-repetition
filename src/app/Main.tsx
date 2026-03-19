import { Grid } from "@mui/material"
import { CreateItemForm } from "@/common/Components/CreateItemForm/CreateItemForm.tsx"
import Container from "@mui/material/Container"
import { createTodolistTC } from "@/features/todolist/model/todolists-slice.ts"
import { Todolists } from "@/features/todolist/ui/Todolists/Todolists.tsx"
import { useAppDispatch } from "@/common/hooks"

export const Main = () => {
  const dispatch = useAppDispatch()

  const createTodolist = (title: string) => {
    dispatch(createTodolistTC(title))
  }

  return (
    <Container maxWidth={"lg"}>
      <Grid container sx={{ mb: "30px" }}>
        <CreateItemForm onCreateItem={createTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
