import {Checkbox, ListItem} from "@mui/material";
import {getListItemSx} from "@/Styles/TodolistItem.styles.ts";
import {EditableSpan} from "@/common/Components/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, Task} from "@/model/task-reducer.ts";
import {ChangeEvent} from "react";

type Props = {
    task: Task
    todolistId: string
}

export const TaskItem = ({todolistId, task}: Props) => {

    const dispatch = useAppDispatch()

    const deleteTaskHandler = () => {
        dispatch(deleteTaskAC({todolistId: todolistId, taskId: task.id}))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC({todolistId: todolistId, taskId: task.id, title}))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({
            todolistId: todolistId,
            taskId: task.id,
            isDone: e.currentTarget.checked
        }))
    }


    return (
        <ListItem sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
            </div>
            <IconButton onClick={deleteTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}