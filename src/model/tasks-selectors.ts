import type { RootState } from '@/app/store'
import {TasksState} from "@/model/task-reducer.ts";

export const selectTasks = (state: RootState): TasksState => state.tasks