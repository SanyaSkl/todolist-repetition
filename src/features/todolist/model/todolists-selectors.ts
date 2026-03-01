import type {RootState} from '@/app/store.ts'
import {Todolist} from "@/features/todolist/model/todolists-reducer.ts";

export const selectTodolists = (state: RootState): Todolist[] => state.todolists