import { TodolistItem } from "@/features/todolist/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { Box, Grid, Paper } from "@mui/material"
import { useGetTodolistsQuery, useReorderTodolistMutation } from "@/features/todolist/api/todolistsApi.ts"
import { containerSx } from "@/common/Styles"
import { TodolistSkeleton } from "@/features/todolist/ui/Todolists/TodolistSkeleton/TodolistSkeleton.tsx"
import { useEffect, useState } from "react"
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core"
import { arrayMove, horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable"
import { SortableTodolist } from "@/features/todolist/ui/Todolists/SortableTodolist/SortableTodolist.tsx"

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery()
  const [items, setItems] = useState(todolists ?? [])

  useEffect(() => {
    if (todolists) {
      setItems(todolists)
    }
  }, [todolists])

  const [reorderTodolist] = useReorderTodolistMutation()

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex((t) => t.id === active.id)
    const newIndex = items.findIndex((t) => t.id === over.id)

    const newItems = arrayMove(items, oldIndex, newIndex)

    setItems(newItems)

    const putAfterItemId = newIndex === 0 ? null : newItems[newIndex - 1].id

    await reorderTodolist({
      todolistId: active.id as string,
      putAfterItemId,
    })
  }

  if (isLoading) {
    return (
      <Box sx={containerSx} style={{ gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    )
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((t) => t.id)} strategy={horizontalListSortingStrategy}>
        {items.map((todolist) => (
          <SortableTodolist key={todolist.id} id={todolist.id}>
            <Grid key={todolist.id}>
              <Paper sx={{ p: "0 20px 20px 20px" }}>
                <TodolistItem todolist={todolist} />
              </Paper>
            </Grid>
          </SortableTodolist>
        ))}
      </SortableContext>
    </DndContext>
  )
}
