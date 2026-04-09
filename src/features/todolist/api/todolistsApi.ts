import { DefaultResponse } from "@/common/types"
import { CreateTodolistResponse } from "@/features/todolist/api/todolistsApi.types.ts"
import { instance } from "@/common/instance"

export const todolistsApi = {
  getTodolists() {
    return instance.get("/todo-lists")
  },

  createTodolist(title: string) {
    return instance.post<CreateTodolistResponse>("/todo-lists", { title })
  },

  deleteTodolist(id: string) {
    return instance.delete<DefaultResponse>(`/todo-lists/${id}`)
  },

  changeTodolistTitle({ id, title }: { id: string; title: string }) {
    return instance.put<DefaultResponse>(`/todo-lists/${id}`, { title })
  },
}
