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
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const keyDownHandler = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
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
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyDown={keyDownHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const removeTaskHandler = () => {
                            props.removeTask(t.id)
                        }
                        return <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button className="buttonDelete"
                                    onClick={removeTaskHandler}>X
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={allClickHandler}>All</button>
                <button onClick={activeClickHandler}>Active</button>
                <button onClick={completedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
