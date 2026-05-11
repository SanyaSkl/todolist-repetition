import { EditableSpan } from "@/common/Components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import styles from "./TodolistTitle.module.css"
import { useChangeTodolistTitleMutation, useDeleteTodolistMutation } from "@/features/todolist/api/todolistsApi.ts"
import { DomainTodolist } from "@/features/todolist/lib/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist

  const [deleteTodolistMutation] = useDeleteTodolistMutation()
  const [changeTodolistTitleMutation] = useChangeTodolistTitleMutation()

  const deleteTodolist = () => deleteTodolistMutation(id)

  const changeTodolistTitle = (title: string) => {
    changeTodolistTitleMutation({ id, title })
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} />
      </h3>
      <IconButton onClick={deleteTodolist}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
