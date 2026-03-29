import { Checkbox, ListItem } from "@mui/material"
import { EditableSpan } from "@/common/Components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { deleteTaskTC, updateTaskTC } from "@/features/todolist/model/task-slice.ts"
import { ChangeEvent } from "react"
import { getListItemSx } from "./TaskItem.styles.ts"
import { DomainTask, TaskStatus } from "@/features/todolist/api/tasksApi.types.ts"

type Props = {
  task: DomainTask
  todolistId: string
}

export const TaskItem = ({ todolistId, task }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTaskHandler = () => {
    dispatch(deleteTaskTC({ todolistId: todolistId, taskId: task.id }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked
    dispatch(
      updateTaskTC({
        todolistId,
        taskId: task.id,
        domainModel: { status: newStatusValue ? TaskStatus.Completed : TaskStatus.New },
      }),
    )
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(updateTaskTC({ todolistId, taskId: task.id, domainModel: { title } }))
  }

  const isDone = task.status === TaskStatus.Completed
  return (
    <ListItem sx={getListItemSx(isDone)}>
      <div>
        <Checkbox checked={isDone} onChange={changeTaskStatusHandler} />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      </div>
      <IconButton onClick={deleteTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
