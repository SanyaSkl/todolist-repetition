import {combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "./task-reduser";
import {todolistReducer} from "./todolist-reduser";


const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)


// @ts-ignore
window.store = store