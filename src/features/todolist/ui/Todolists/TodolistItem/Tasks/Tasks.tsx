import { List } from "@mui/material"
import { TaskItem } from "@/features/todolist/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import { TaskStatus } from "@/common/enum"
import { useGetTasksQuery } from "@/features/todolist/api/tasksApi.ts"
import { TasksSkeleton } from "@/features/todolist/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx"
import { DomainTodolist } from "@/features/todolist/lib/types"
import { useState } from "react"
import { TasksPagination } from "@/features/todolist/ui/Todolists/TodolistItem/Tasks/TasksPagination/TasksPagination.tsx"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  const [page, setPage] = useState(1)

  const { data, isLoading } = useGetTasksQuery({ todolistId: id, params: { page } })

  // const tasks = useAppSelector(selectTasks)
  // const dispatch = useAppDispatch()
  //
  // useEffect(() => {
  //   dispatch(fetchTasksTC(id))
  // }, [])

  let filteredTasks = data?.items
  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed)
  }

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <>
          <List>
            {filteredTasks?.map((task) => (
              <TaskItem key={task.id} task={task} todolist={todolist} />
            ))}
          </List>
          <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
        </>
      )}
    </>
  )
}
