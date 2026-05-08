import { GetTasksResponse, TaskOperationResponse, UpdateTaskModel } from "./tasksApi.types"
import { DefaultResponse } from "@/common/types"
import { instance } from "@/common/instance"
import { baseApi } from "@/app/baseApi.ts"
import { PAGE_SIZE } from "@/common/constants"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, { todolistId: string; params: { page: number } }>({
      // query: (todolistId) => `todo-lists/${todolistId}/tasks`,
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
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi

export const _tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask({ todolistId, title }: { todolistId: string; title: string }) {
    return instance.post<TaskOperationResponse>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask({ todolistId, taskId }: { todolistId: string; taskId: string }) {
    return instance.delete<DefaultResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask({ todolistId, taskId, model }: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    return instance.put<TaskOperationResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}
