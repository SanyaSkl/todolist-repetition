import {List} from "@mui/material";
import {selectTasks} from "@/features/todolist/model/tasks-selectors.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {Todolist} from "@/features/todolist/model/todolists-reducer.ts";
import {TaskItem} from "@/features/todolist/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx";

type Props = {
    todolist: Todolist
}


export const Tasks = ({todolist}: Props) => {
    const {id, filter} = todolist

    const tasks = useAppSelector(selectTasks)

    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks
    if (filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }

    return (
        <>
            {filteredTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {filteredTasks.map(task => (
                        <TaskItem key={task.id} task={task} todolistId={id}/>
                    ))}
                </List>
            )}
        </>
    )
}