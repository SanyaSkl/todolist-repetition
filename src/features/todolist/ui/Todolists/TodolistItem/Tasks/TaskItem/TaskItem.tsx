import { Checkbox, ListItem } from "@mui/material"
import { EditableSpan } from "@/common/Components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { deleteTaskTC, updateTaskTC } from "@/features/todolist/model/task-slice.ts"
import { ChangeEvent } from "react"
import { getListItemSx } from "./TaskItem.styles.ts"
import { DomainTask } from "@/features/todolist/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enum"
import { DomainTodolist } from "@/features/todolist/model/todolists-slice.ts"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const TaskItem = ({ task, todolist }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTaskHandler = () => {
    dispatch(deleteTaskTC({ todolistId: todolist.id, taskId: task.id }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked
    dispatch(
      updateTaskTC({
        todolistId: todolist.id,
        taskId: task.id,
        domainModel: { status: newStatusValue ? TaskStatus.Completed : TaskStatus.New },
      }),
    )
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(updateTaskTC({ todolistId: todolist.id, taskId: task.id, domainModel: { title } }))
  }

  const isTaskCompleted = task.status === TaskStatus.Completed
  const disabled = todolist.entityStatus === "loading"

  const isDone = task.status === TaskStatus.Completed

  return (
    <ListItem sx={getListItemSx(isTaskCompleted)}>
      <div>
        <Checkbox checked={isDone} onChange={changeTaskStatusHandler} disabled={disabled} />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} disabled={disabled} />
        <span> - {new Date(task.addedDate).toLocaleDateString()}</span>
      </div>
      <IconButton onClick={deleteTaskHandler} disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
