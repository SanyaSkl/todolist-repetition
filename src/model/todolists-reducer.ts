import {FilterValues, Todolist} from '@/app/App.tsx'
import {createAction, createReducer} from "@reduxjs/toolkit";
import {nanoid} from '@reduxjs/toolkit'

const initialState: Todolist[] = []

export const createTodolistAC = createAction(
    'todolists/createTodolist', (title: string) => ({
        payload: {id: nanoid(), title}
    })
)

export const deleteTodolistAC = createAction<{ id: string }>('todolists/deleteTodolist')

export const changeTodolistTitleAC = createAction<{ id: string, title: string }>('todolists/changeTodolistTitle')

export const changeTodolistFilterAC = createAction<{ id: string, filter: FilterValues }>
('todolists/changeTodolistFilter')

export const todolistsReducer = createReducer(initialState, builder => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            const {id, title} = action.payload
            state.push({id, title, filter: 'all'})
        })
        .addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex(t => t.id === action.payload.id)
            if (index > -1) state.splice(index, 1)
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const todolist = state.find(tl => tl.id === action.payload.id)
            if (todolist) todolist.title = action.payload.title
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
            const todolist = state.find(tl => tl.id === action.payload.id)
            if (todolist) todolist.filter = action.payload.filter
        })
})


//--------------------------------------------------------


// export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
//     switch (action.type) {
//         case 'delete_todolist': {
//             return state.filter(todolist => todolist.id !== action.payload.id)
//         }
//         case 'create_todolist': {
//             const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
//             return [...state, newTodolist]
//         }
//         case 'change_todolist_title': {
//             return state.map(todolist => todolist.id === action.payload.id ? {
//                 ...todolist,
//                 title: action.payload.title
//             } : todolist)
//         }
//         case 'change_todolist_filter': {
//             return state.map(todolist => todolist.id === action.payload.id ? {
//                     ...todolist,
//                     filter: action.payload.filter
//                 } : todolist
//             )
//         }
//         default:
//             return state
//     }
// }

// export const deleteTodolistAC = (id: string) => {
//     return {type: 'delete_todolist', payload: {id}} as const
// }

// export const createTodolistAC = (title: string) => {
//     return {type: 'create_todolist', payload: {id: v1(), title}} as const
// }

// export const changeTodolistTitleAC = (payload: { id: string, title: string }) => {
//     return {type: 'change_todolist_title', payload} as const
// }

// export const changeTodolistFilterAC = (payload: { id: string, filter: FilterValues }) => {
//     return {type: 'change_todolist_filter', payload} as const
// }