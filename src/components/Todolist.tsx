import React, {ChangeEvent, useState} from "react";
import {FilterValuesType} from "../App";


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
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const keyDownHandler = (e: React.KeyboardEvent<HTMLElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            props.addTask(title, props.id)
            setTitle('')
        }
    }
    const addTask = () => {
        if (title.trim() !== ""){
            props.addTask(title.trim(), props.id)
            setTitle('')
        } else {
            setError("Title is required")
        }

    }
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

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolist}>X</button></h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={keyDownHandler}
                    className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                { error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const removeTaskHandler = () => props.removeTask(t.id, props.id)
                        const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}><input
                            type="checkbox"
                            onChange={changeHandler}
                            checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button className="buttonDelete"
                                    onClick={removeTaskHandler}>X
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={allClickHandler}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={activeClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={completedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
