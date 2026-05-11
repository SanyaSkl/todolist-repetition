import { DefaultResponse } from "@/common/types"
import { CreateTodolistResponse, Todolist } from "@/features/todolist/api/todolistsApi.types.ts"
import { baseApi } from "@/app/baseApi.ts"
import { DomainTodolist } from "@/features/todolist/lib/types"

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => "/todo-lists",
      transformResponse: (todolists: Todolist[]) => {
        return todolists.map((tl) => ({ ...tl, filter: "all" }))
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
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
            const index = state.findIndex((todolist) => todolist.id === id)
            if (index !== -1) state.splice(index, 1)
          }),
        )

        try {
          await queryFulfilled
        } catch (e) {
          patchResult.undo()
        }
      },
      invalidatesTags: ["Todolist"],
    }),
    changeTodolistTitle: build.mutation<DefaultResponse, { id: string; title: string }>({
      query: ({ id, title }) => {
        return { method: "put", url: `/todo-lists/${id}`, body: { title } }
      },
      invalidatesTags: ["Todolist"],
    }),
    reorderTodolist: build.mutation<DefaultResponse, { todolistId: string; putAfterItemId: string | null }>({
      query: ({ todolistId, putAfterItemId }) => ({
        method: "put",
        url: `/todo-lists/${todolistId}/reorder`,
        body: { putAfterItemId },
      }),
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useChangeTodolistTitleMutation,
  useReorderTodolistMutation,
} = todolistsApi
