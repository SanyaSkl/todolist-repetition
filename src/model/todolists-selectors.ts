import type {RootState} from '@/app/store'
import {Todolist} from "@/model/todolists-reducer.ts";

export const selectTodolists = (state: RootState): Todolist[] => state.todolists