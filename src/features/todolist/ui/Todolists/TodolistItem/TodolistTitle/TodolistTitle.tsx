import { EditableSpan } from "@/common/Components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import styles from "./TodolistTitle.module.css"
import {
  todolistsApi,
  useChangeTodolistTitleMutation,
  useDeleteTodolistMutation,
} from "@/features/todolist/api/todolistsApi.ts"
import { useAppDispatch } from "@/common/hooks"
import { RequestStatus } from "@/common/types"
import { DomainTodolist } from "@/features/todolist/lib/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist
  const dispatch = useAppDispatch()

  const [deleteTodolistMutation] = useDeleteTodolistMutation()
  const [changeTodolistTitleMutation] = useChangeTodolistTitleMutation()

  const changeTodolistStatus = (entityStatus: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todolist = state.find((todolist) => todolist.id === id)
        if (todolist) {
          todolist.entityStatus = entityStatus
        }
      }),
    )
  }

  const deleteTodolist = () => {
    changeTodolistStatus("loading")
    deleteTodolistMutation(id)
      .unwrap()
      .catch(() => {
        changeTodolistStatus("failed")
      })
  }

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitleMutation({ id, title })
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      </h3>
      <IconButton onClick={deleteTodolist} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
