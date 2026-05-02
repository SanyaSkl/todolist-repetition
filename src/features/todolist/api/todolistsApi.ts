import { DefaultResponse } from "@/common/types"
import { CreateTodolistResponse, Todolist } from "@/features/todolist/api/todolistsApi.types.ts"
import { instance } from "@/common/instance"
import { baseApi } from "@/app/baseApi.ts"
import { DomainTodolist } from "@/features/todolist/lib/types"

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => "/todo-lists",
      transformResponse: (todolists: Todolist[]) => {
        return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      },
      providesTags: ["Todolist"],
    }),
    createTodolist: build.mutation<CreateTodolistResponse, string>({
      query: (title) => {
        return { method: "post", url: "/todo-lists", body: { title } }
      },
      invalidatesTags: ["Todolist"],
    }),
    deleteTodolist: build.mutation<DefaultResponse, string>({
      query: (id) => {
        return { method: "delete", url: `/todo-lists/${id}` }
      },
      invalidatesTags: ["Todolist"],
    }),
    changeTodolistTitle: build.mutation<DefaultResponse, { id: string; title: string }>({
      query: ({ id, title }) => {
        return { method: "put", url: `/todo-lists/${id}`, body: { title } }
      },
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useChangeTodolistTitleMutation,
} = todolistsApi

export const _todolistsApi = {
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
