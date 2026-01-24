import {ChangeEvent, KeyboardEvent, useState} from 'react';
import type {FilterValues, Task, Todolist} from './App'
import {Button} from './Button'

type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
}

export const TodolistItem = (props: Props) => {
    const {
        todolist: {id, title, filter},
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        deleteTodolist,
    } = props
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()

        if (trimmedTitle !== '') {
            createTask(id, trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const changeTaskStatusHandler = (
        taskId: string, isDone: boolean) => {
        changeTaskStatus(id, taskId, isDone)
    }

    return (
        <div>
            <div className="container">
                <h3>{title}</h3>
                <Button title="X" onClick={deleteTodolistHandler}/>
            </div>

            <div>
                <input
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={createTaskOnEnterHandler}
                />
                <Button title="+" onClick={createTaskHandler}/>
                {error && <div className="error-message">{error}</div>}
            </div>

            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {

                        // const changeTaskStatusHandler = (
                        //     e: ChangeEvent<HTMLInputElement>
                        // ) => {
                        //     changeTaskStatus(id, task.id, e.currentTarget.checked)
                        // }

                        const deleteTaskHandler = () => {
                            deleteTask(id, task.id)
                        }

                        return (
                            <li
                                key={task.id}
                                className={task.isDone ? 'is-done' : ''}
                            >
                                <Button title="x" onClick={deleteTaskHandler}/>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={(event) =>
                                        changeTaskStatusHandler(task.id, event.currentTarget.checked)}
                                />
                                <span>{task.title}</span>
                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                <Button
                    className={filter === 'all' ? 'active-filter' : ''}
                    title="All"
                    onClick={() => changeFilterHandler('all')}
                />
                <Button
                    className={filter === 'active' ? 'active-filter' : ''}
                    title="Active"
                    onClick={() => changeFilterHandler('active')}
                />
                <Button
                    className={filter === 'completed' ? 'active-filter' : ''}
                    title="Completed"
                    onClick={() => changeFilterHandler('completed')}
                />
            </div>
        </div>
    )
}