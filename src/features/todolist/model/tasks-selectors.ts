import type { RootState } from '@/app/store.ts'
import {TasksState} from "@/features/todolist/model/task-reducer.ts";

export const selectTasks = (state: RootState): TasksState => state.tasks