import {combineReducers, createStore} from "redux";
import {todolistReducer} from "./todolist-reduser";
import {tasksReducer} from "./task-reduser";



const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)


// @ts-ignore
window.store = store