import { Box } from "@mui/material"
import Button from "@mui/material/Button"
import { useAppDispatch } from "@/common/hooks"
import { containerSx } from "@/common/Styles"
import { todolistsApi } from "@/features/todolist/api/todolistsApi.ts"
import { DomainTodolist, FilterValues } from "@/features/todolist/lib/types"

type Props = {
  todolist: DomainTodolist
}

export const FilterButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeFilter = (filter: FilterValues) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (data) => {
        const todolist = data.find((todolist) => todolist.id === id)
        if (todolist) {
          todolist.filter = filter
        }
      }),
    )
  }

  return (
    <Box sx={containerSx}>
      <Button variant={filter === "all" ? "outlined" : "text"} color={"inherit"} onClick={() => changeFilter("all")}>
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilter("active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilter("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
