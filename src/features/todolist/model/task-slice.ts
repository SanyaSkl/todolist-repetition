import { createTodolistTC, deleteTodolistTC } from "./todolists-slice.ts"
import { createSlice, nanoid } from "@reduxjs/toolkit"

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type TasksState = {
  [key: string]: Task[]
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksState,
  reducers: (create) => ({
    deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    }),
    createTaskAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
      const newTask: Task = { title: action.payload.title, isDone: false, id: nanoid() }
      state[action.payload.todolistId].unshift(newTask)
    }),
    changeTaskStatusAC: create.reducer<{ todolistId: string; taskId: string; isDone: boolean }>((state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
      if (task) {
        task.isDone = action.payload.isDone
      }
    }),
    changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
      if (task) {
        task.title = action.payload.title
      }
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const { deleteTaskAC, createTaskAC, changeTaskStatusAC, changeTaskTitleAC } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
export const tasksReducer = tasksSlice.reducer

//const initialState: TasksState = {}

// export const createTaskAC = createAction("tasks/createTask", (todolistId: string, title: string) => ({
//   payload: { todolistId, taskId: nanoid(), title },
// }))
//
// export const tasksReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(createTodolistAC, (state, action) => {
//       state[action.payload.id] = []
//     })
//     .addCase(deleteTodolistAC, (state, action) => {
//       delete state[action.payload.id]
//     })
//     .addCase(createTaskAC, (state, action) => {
//       const { todolistId, taskId, title } = action.payload
//       if (!state[todolistId]) return
//       const newTask = { id: taskId, title, isDone: false }
//       state[todolistId].unshift(newTask)
//     })
// })

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
