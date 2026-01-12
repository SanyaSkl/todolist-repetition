import {ChangeEvent, KeyboardEvent, useState} from 'react';
import type {FilterValues, Task} from './App'
import {Button} from './Button'

type Props = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter?: FilterValues
}

export const TodolistItem = (props: Props) => {
    const {title, tasks, deleteTask, changeFilter, createTask, changeTaskStatus, filter} = props

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            createTask(trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }
    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }

    const mappedTaskHandler = tasks.map(task => {

        const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const newStatusValue = event.currentTarget.checked
            changeTaskStatus(task.id, newStatusValue)
        }
        const deleteTaskHandler = () => {
            deleteTask(task.id)
        }

        return (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <Button title={'x'} onClick={deleteTaskHandler}/>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeTaskStatusHandler}/>
                <span>{task.title}</span>
            </li>
        )
    })

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={createTaskOnEnterHandler}
                />
                <Button
                    title={'+'}
                    onClick={createTaskHandler}
                />
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {mappedTaskHandler}
                </ul>
            )}
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
                        onClick={() => changeFilter('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
                        onClick={() => changeFilter('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
                        onClick={() => changeFilter('completed')}/>
            </div>
        </div>
    )
}
