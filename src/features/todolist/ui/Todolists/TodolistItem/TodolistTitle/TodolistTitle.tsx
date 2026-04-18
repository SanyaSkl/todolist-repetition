import { EditableSpan } from "@/common/Components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { DomainTodolist } from "@/features/todolist/model/todolists-slice.ts"
import styles from "./TodolistTitle.module.css"
import { useChangeTodolistTitleMutation, useDeleteTodolistMutation } from "@/features/todolist/api/todolistsApi.ts"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist

  const [deleteTodolistMutation] = useDeleteTodolistMutation()
  const [changeTodolistTitleMutation] = useChangeTodolistTitleMutation()

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitleMutation({ id, title })
  }
  const deleteTodolistHandler = () => {
    deleteTodolistMutation(id)
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      </h3>
      <IconButton onClick={deleteTodolistHandler} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
