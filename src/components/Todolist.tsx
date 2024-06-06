import React, {ChangeEvent, useState} from "react";
import {FilterValuesType} from "../App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeFilter: (value: FilterValuesType) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
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
            props.addTask(title)
            setTitle('')
        }
    }
    const addTask = () => {
        if (title.trim() !== ""){
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError("Title is required")
        }

    }
    const allClickHandler = () => {
        props.changeFilter("all")
    }
    const activeClickHandler = () => {
        props.changeFilter("active")
    }
    const completedClickHandler = () => {
        props.changeFilter("completed")
    }

    return (
        <div>
            <h3>{props.title}</h3>
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
                        const removeTaskHandler = () => props.removeTask(t.id)
                        const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked)
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
