import { CreateItemForm } from "@/common/Components/CreateItemForm/CreateItemForm.tsx"
import { Todolist } from "@/features/todolist/model/todolists-reducer.ts"
import { createTaskAC } from "@/features/todolist/model/task-reducer.ts"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle.tsx"
import { FilterButtons } from "./FilterButtons/FilterButtons.tsx"
import { Tasks } from "./Tasks/Tasks.tsx"
import { useAppDispatch } from "@/common/hooks"

type Props = {
  todolist: Todolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const createTaskHandler = (title: string) => {
    dispatch(createTaskAC(todolist.id, title))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
