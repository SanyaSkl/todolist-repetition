import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "./EditableSpan";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const allClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const activeClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const completedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    const AddTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete fontSize="inherit"/>
                </IconButton>
            </h3>
            <AddItemForm addItem={AddTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                        const removeTaskHandler = () => props.removeTask(t.id, props.id)
                        const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }

                        const changeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox
                                onChange={changeStatusHandler}
                                checked={t.isDone}/>
                            <EditableSpan
                                title={t.title}
                                onChange={changeTitleHandler}/>
                            <IconButton
                                onClick={removeTaskHandler}
                                size={"small"}>
                                <Delete
                                    fontSize="inherit"/>
                            </IconButton>
                        </li>
                    })
                }
            </ul>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"}
                        onClick={allClickHandler}>All
                </Button>
                <Button color={'primary'} variant={props.filter === "active" ? "contained" : "text"}
                        onClick={activeClickHandler}>Active
                </Button>
                <Button color={'warning'} variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={completedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}




