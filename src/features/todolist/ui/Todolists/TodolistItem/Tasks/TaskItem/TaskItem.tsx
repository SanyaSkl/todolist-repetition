import { Checkbox, ListItem } from "@mui/material"
import { EditableSpan } from "@/common/Components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { ChangeEvent } from "react"
import { getListItemSx } from "./TaskItem.styles.ts"
import { DomainTask } from "@/features/todolist/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enum"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/features/todolist/api/tasksApi.ts"
import { createTaskModel } from "@/features/todolist/lib/utils"
import { DomainTodolist } from "@/features/todolist/lib/types"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const TaskItem = ({ task, todolist }: Props) => {
  const [deleteTaskMutation] = useDeleteTaskMutation()
  const [updateTaskMutation] = useUpdateTaskMutation()

  const deleteTask = () => {
    deleteTaskMutation({ todolistId: todolist.id, taskId: task.id })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const model = createTaskModel(task, { status })
    updateTaskMutation({ taskId: task.id, todolistId: todolist.id, model })
  }

  const changeTaskTitle = (title: string) => {
    const model = createTaskModel(task, { title })
    updateTaskMutation({ taskId: task.id, todolistId: todolist.id, model })
  }

  const isTaskCompleted = task.status === TaskStatus.Completed

  const isDone = task.status === TaskStatus.Completed

  return (
    <ListItem sx={getListItemSx(isTaskCompleted)}>
      <div>
        <Checkbox checked={isDone} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
      </div>
      <IconButton onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
