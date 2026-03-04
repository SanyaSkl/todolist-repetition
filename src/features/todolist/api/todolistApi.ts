import {BaseResponse} from "@/common/types";
import {Todolist} from "@/features/todolist/api/todolistApi.types.ts";
import {instance} from "@/common/instance";

export const todolistsApi = {
    getTodolists() {
        return instance.get('/todo-lists')
    },

    createTodolist(title: string) {
        return instance.post<BaseResponse<{ item: Todolist }>>('/todo-lists', {title})
    },

    deleteTodolist(id: string) {
        return instance.delete<BaseResponse>(`/todo-lists/${id}`)
    },

    changeTodolistTitle({id, title}: { id: string, title: string }) {
        return instance.put<BaseResponse>(`/todo-lists/${id}`, {title})
    }
}