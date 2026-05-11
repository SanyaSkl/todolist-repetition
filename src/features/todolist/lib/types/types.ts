import { Todolist } from "@/features/todolist/api/todolistsApi.types.ts"

export type DomainTodolist = Todolist & {
  filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
