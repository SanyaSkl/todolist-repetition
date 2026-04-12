import { configureStore } from "@reduxjs/toolkit"
import { tasksReducer, tasksSlice } from "@/features/todolist/model/task-slice.ts"
import { appReducer, appSlice } from "./app-slice.ts"
import { todolistsReducer, todolistsSlice } from "@/features/todolist/model/todolists-slice.ts"
import { authReducer, authSlice } from "@/features/auth/authSlice.ts"

// создание store
export const store = configureStore({
  reducer: {
    [todolistsSlice.name]: todolistsReducer,
    [tasksSlice.name]: tasksReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
  },
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
