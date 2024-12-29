import {Delete} from "@mui/icons-material";
import {Checkbox, IconButton} from "@mui/material";
import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const removeTaskHandler = () => props.removeTask(props.task.id, props.todolistId)
    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }

    const changeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.changeTaskTitle, props.task.id, props.todolistId])

    return <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            onChange={changeStatusHandler}
            checked={props.task.isDone}/>
        <EditableSpan
            title={props.task.title}
            onChange={changeTitleHandler}/>
        <IconButton
            onClick={removeTaskHandler}
            size={"small"}>
            <Delete
                fontSize="inherit"/>
        </IconButton>
    </li>
})