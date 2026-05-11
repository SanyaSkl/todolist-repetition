import { GetTasksResponse, TaskOperationResponse, UpdateTaskModel } from "./tasksApi.types"
import { DefaultResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi.ts"
import { PAGE_SIZE } from "@/common/constants"

type Patch = {
  op: "replace" | "remove" | "add"
  path: (string | number)[]
  value?: any
}

type PatchCollection = {
  patches: Patch[]
  inversePatches: Patch[]
  undo: () => void
}

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, { todolistId: string; params: { page: number } }>({
      query: ({ todolistId, params }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        params: { ...params, count: PAGE_SIZE },
      }),
      providesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    createTask: build.mutation<TaskOperationResponse, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => {
        return { method: "post", url: `/todo-lists/${todolistId}/tasks`, body: { title } }
      },
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    deleteTask: build.mutation<DefaultResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => {
        return { method: "delete", url: `/todo-lists/${todolistId}/tasks/${taskId}` }
      },
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    updateTask: build.mutation<TaskOperationResponse, { todolistId: string; taskId: string; model: UpdateTaskModel }>({
      query: ({ todolistId, taskId, model }) => {
        return { method: "put", url: `/todo-lists/${todolistId}/tasks/${taskId}`, body: model }
      },
      async onQueryStarted({ todolistId, taskId, model }, { dispatch, queryFulfilled, getState }) {
        const args = tasksApi.util.selectCachedArgsForQuery(getState(), "getTasks")

        const patchResults: PatchCollection[] = []

        args.forEach((arg) => {
          patchResults.push(
            dispatch(
              tasksApi.util.updateQueryData("getTasks", { todolistId, params: { page: arg.params.page } }, (state) => {
                const index = state.items.findIndex((task) => task.id === taskId)
                if (index !== -1) {
                  state.items[index] = { ...state.items[index], ...model }
                }
              }),
            ),
          )
        })

        try {
          await queryFulfilled
        } catch (e) {
          patchResults.forEach((patchResult) => {
            patchResult.undo()
          })
        }
      },
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    reorderTask: build.mutation<
      DefaultResponse,
      {
        todolistId: string
        taskId: string
        putAfterItemId: string | null
      }
    >({
      query: ({ todolistId, taskId, putAfterItemId }) => ({
        method: "put",
        url: `/todo-lists/${todolistId}/tasks/${taskId}/reorder`,
        body: { putAfterItemId },
      }),
    }),
  }),
})

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useReorderTaskMutation,
} = tasksApi
