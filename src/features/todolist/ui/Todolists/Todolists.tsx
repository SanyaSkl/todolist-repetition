import { TodolistItem } from "@/features/todolist/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { Box, Grid, Paper } from "@mui/material"
import { useGetTodolistsQuery, useReorderTodolistMutation } from "@/features/todolist/api/todolistsApi.ts"
import { containerSx } from "@/common/Styles"
import { TodolistSkeleton } from "@/features/todolist/ui/Todolists/TodolistSkeleton/TodolistSkeleton.tsx"
import { useEffect, useState } from "react"
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core"
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable"
import { SortableTodolist } from "@/features/todolist/ui/Todolists/SortableTodolist/SortableTodolist.tsx"
import { reorderItems } from "@/common/utils"

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

    if (!over || active.id === over.id) {
      return
    }

    const { reorderedItems, putAfterItemId } = reorderItems(items, active.id as string, over.id as string)

    setItems(reorderedItems)

    try {
      await reorderTodolist({
        todolistId: active.id as string,
        putAfterItemId,
      }).unwrap()
    } catch {
      setItems(items)
    }
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
