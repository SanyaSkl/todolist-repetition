import {createTodolistAC, deleteTodolistAC} from './todolists-reducer.ts';
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type TasksState = {
    [key: string]: Task[]
}

const initialState: TasksState = {}

export const createTaskAC = createAction(
    'tasks/createTask', (todolistId: string, title: string) => ({
        payload: {todolistId, taskId: nanoid(), title}
    })
)

export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>
('tasks/deleteTask')

export const changeTaskStatusAC = createAction<{ todolistId: string, taskId: string, isDone: boolean }>
('tasks/changeTaskStatus')

export const changeTaskTitleAC = createAction<{ todolistId: string, taskId: string, title: string }>
('tasks/changeTaskTitle')


export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id];
        })
        .addCase(createTaskAC, (state, action) => {
            const {todolistId, taskId, title} = action.payload
            if (!state[todolistId]) return
            const newTask = {id: taskId, title, isDone: false}
            state[todolistId].unshift(newTask)
        })

        .addCase(deleteTaskAC, (state, action) => {
            const {todolistId, taskId} = action.payload
            const tasks = state[todolistId];
            if (!tasks) return
            const index = tasks.findIndex(task => task.id === taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const {todolistId, taskId, isDone} = action.payload
            const task = state[todolistId].find(t => t.id === taskId)
            if (task) {
                task.isDone = isDone
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const {todolistId, taskId, title} = action.payload
            const task = state[todolistId].find(t => t.id === taskId)
            if (task) task.title = title
        })
})


//-----------------------------------------------------------------


// export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
//     switch (action.type) {
//         case 'create_todolist': {
//             return {...state, [action.payload.id]: []}
//         }
//         case 'delete_todolist': {
//             const newState = {...state}
//             delete newState[action.payload.id]
//             return newState
//         }
//         case 'delete_task': {
//             const tasksForList = state[action.payload.todolistId];
//             if (!tasksForList) return state;
//             return {
//                 ...state, [action.payload.todolistId]: tasksForList.filter(task => task.id !== action.payload.taskId)
//             }
//         }
//         case 'create_task': {
//             const tasksForList = state[action.payload.todolistId] ?? []
//             const newTask = {id: nanoid(), title: action.payload.title, isDone: false}
//             return {...state, [action.payload.todolistId]: [newTask, ...tasksForList]}
//         }
//         case 'change_task_status': {
//             const tasksForList = state[action.payload.todolistId];
//             if (!tasksForList) return state;
//
//             return {
//                 ...state,
//                 [action.payload.todolistId]: tasksForList.map(task => task.id === action.payload.taskId ? {
//                     ...task,
//                     isDone: action.payload.isDone
//                 } : task)
//             }
//         }
//         case 'change_task_title': {
//             const tasksForList = state[action.payload.todolistId];
//             if (!tasksForList) return state;
//             return {
//                 ...state,
//                 [action.payload.todolistId]: tasksForList.map(task => task.id === action.payload.taskId ? {
//                     ...task,
//                     title: action.payload.title
//                 } : task)
//             }
//         }
//         default:
//             return state
//     }
// }

// export const deleteTaskAC = (payload: { todolistId: string, taskId: string }) => {
//     return {type: 'delete_task', payload} as const
// }

// export const createTaskAC = (payload: { todolistId: string, title: string }) => {
//     return {type: 'create_task', payload} as const
// }

// export const changeTaskStatusAC = (payload: { todolistId: string, taskId: string, isDone: boolean }) => {
//     return {type: 'change_task_status', payload} as const
// }

// export const changeTaskTitleAC = (payload: { todolistId: string, taskId: string, title: string }) => {
//     return {type: 'change_task_title', payload} as const
// }