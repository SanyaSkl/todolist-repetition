import { CreateItemForm } from "@/common/Components/CreateItemForm/CreateItemForm.tsx"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle.tsx"
import { FilterButtons } from "./FilterButtons/FilterButtons.tsx"
import { Tasks } from "./Tasks/Tasks.tsx"
import { useCreateTaskMutation } from "@/features/todolist/api/tasksApi.ts"
import { DomainTodolist } from "@/features/todolist/lib/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  // const dispatch = useAppDispatch()

  const [createTaskMutation] = useCreateTaskMutation()

  const createTask = (title: string) => {
    createTaskMutation({ todolistId: todolist.id, title })
    // dispatch(createTaskTC({ todolistId: todolist.id, title }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} entityStatus={todolist.entityStatus} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
