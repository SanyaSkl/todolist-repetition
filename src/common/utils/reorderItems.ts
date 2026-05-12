import { arrayMove } from "@dnd-kit/sortable"

type ReorderItemsResult<T> = {
  reorderedItems: T[]
  putAfterItemId: string | null
}

export const reorderItems = <T extends { id: string }>(
  items: T[],
  activeId: string,
  overId: string,
): ReorderItemsResult<T> => {
  const oldIndex = items.findIndex((item) => item.id === activeId)

  const newIndex = items.findIndex((item) => item.id === overId)

  const reorderedItems = arrayMove(items, oldIndex, newIndex)

  const putAfterItemId = newIndex === 0 ? null : reorderedItems[newIndex - 1].id

  return {
    reorderedItems,
    putAfterItemId,
  }
}
