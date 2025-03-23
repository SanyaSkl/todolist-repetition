import axios from 'axios';

type TodolistType = {
    'id': string
    'title': string
    'addedDate': string
    'order': number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>,
    data: D
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModel = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type TasksResponseType = {
    totalCount: number
    error: string | null
    items: TaskType[]
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '1f899b25-ea32-4422-868d-0e025508e3bf'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title})
    },

    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },

    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
    },

    getTasks(todolistId: string) {
        return instance.get<TasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    createTask(todolistId: string, taskTitle: string) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/`, {title: taskTitle})
    },

    updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
        return instance.put<UpdateTaskModel>(`todo-lists/${todolistId}/tasks/${taskId}/`, model)
    },
}

