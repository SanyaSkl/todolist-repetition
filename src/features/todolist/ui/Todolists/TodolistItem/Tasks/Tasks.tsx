import { List } from "@mui/material"
import { TaskItem } from "@/features/todolist/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { fetchTasksTC, selectTasks } from "@/features/todolist/model/task-slice.ts"
import { DomainTodolist } from "@/features/todolist/model/todolists-slice.ts"
import { useEffect } from "react"
import { TaskStatus } from "@/common/enum"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(id))
  }, [])

  const todolistTasks = tasks[id]
  let filteredTasks = todolistTasks
  if (filter === "active") {
    filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks?.map((task) => (
            <TaskItem key={task.id} task={task} todolist={todolist} />
          ))}
        </List>
      )}
    </>
  )
}
