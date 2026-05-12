import { List } from "@mui/material"
import { TaskItem } from "@/features/todolist/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import { TaskStatus } from "@/common/enum"
import { useGetTasksQuery, useReorderTaskMutation } from "@/features/todolist/api/tasksApi.ts"
import { TasksSkeleton } from "@/features/todolist/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx"
import { DomainTodolist } from "@/features/todolist/lib/types"
import { useEffect, useState } from "react"
import { TasksPagination } from "@/features/todolist/ui/Todolists/TodolistItem/Tasks/TasksPagination/TasksPagination.tsx"
import { PAGE_SIZE } from "@/common/constants"
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { SortableTask } from "@/features/todolist/ui/Todolists/TodolistItem/Tasks/SortableTask/SortableTask.tsx"
import { reorderItems } from "@/common/utils"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const [page, setPage] = useState(1)

  const { data, isLoading } = useGetTasksQuery({
    todolistId: id,
    params: { page },
  })

  const [reorderTask] = useReorderTaskMutation()

  const totalCount = data?.totalCount ?? 0

  useEffect(() => {
    if (totalCount <= PAGE_SIZE) {
      setPage(1)
    }
  }, [totalCount])

  let filteredTasks = data?.items

  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
  }

  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed)
  }

  const [tasks, setTasks] = useState(filteredTasks ?? [])

  useEffect(() => {
    setTasks(filteredTasks ?? [])
  }, [filteredTasks])

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) {
      return
    }
    const { reorderedItems, putAfterItemId } = reorderItems(tasks, active.id as string, over.id as string)
    setTasks(reorderedItems)

    try {
      await reorderTask({
        todolistId: todolist.id,
        taskId: active.id as string,
        putAfterItemId,
      }).unwrap()
    } catch {
      setTasks(tasks)
    }
  }

  if (isLoading) {
    return <TasksSkeleton />
  }

  const showPagination = totalCount > PAGE_SIZE

  return (
    <>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <>
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
              <List>
                {tasks.map((task) => (
                  <SortableTask key={task.id} id={task.id}>
                    <TaskItem task={task} todolist={todolist} />
                  </SortableTask>
                ))}
              </List>
            </SortableContext>
          </DndContext>

          {showPagination && <TasksPagination totalCount={totalCount} page={page} setPage={setPage} />}
        </>
      )}
    </>
  )
}
