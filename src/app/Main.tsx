import { Grid } from "@mui/material"
import { CreateItemForm } from "@/common/Components/CreateItemForm/CreateItemForm.tsx"
import Container from "@mui/material/Container"
import { createTodolistTC } from "@/features/todolist/model/todolists-slice.ts"
import { Todolists } from "@/features/todolist/ui/Todolists/Todolists.tsx"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { Navigate } from "react-router"
import { Path } from "@/common/routing"
import { selectIsLoggedIn } from "@/features/auth/authSlice.ts"

export const Main = () => {
  const dispatch = useAppDispatch()

  const createTodolist = (title: string) => {
    dispatch(createTodolistTC(title))
  }

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  if (!isLoggedIn) return <Navigate to={Path.Login} />

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
