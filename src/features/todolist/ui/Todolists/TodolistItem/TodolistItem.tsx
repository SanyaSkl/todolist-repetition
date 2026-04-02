import { CreateItemForm } from "@/common/Components/CreateItemForm/CreateItemForm.tsx"
import { DomainTodolist } from "@/features/todolist/model/todolists-slice.ts"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle.tsx"
import { FilterButtons } from "./FilterButtons/FilterButtons.tsx"
import { Tasks } from "./Tasks/Tasks.tsx"
import { useAppDispatch } from "@/common/hooks"
import { createTaskTC } from "@/features/todolist/model/task-slice.ts"

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const createTaskHandler = (title: string) => {
    dispatch(createTaskTC({ todolistId: todolist.id, title }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTaskHandler} entityStatus={todolist.entityStatus} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
