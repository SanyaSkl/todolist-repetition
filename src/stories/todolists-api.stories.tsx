import {useEffect, useState} from 'react';
import {todolistsApi} from '../api/todolist-api';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.createTodolist('Todolist new')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '56e21a56-794e-4b99-8a86-41ff426fbbce'
        todolistsApi.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistsTitle = (id: string, title: string) => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '766b987c-9ab7-4758-adbe-3dfa478f6ff7'
        todolistsApi.updateTodolist(todolistId, 'Hello')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '72231b5d-c625-484d-8d17-75a7b4c092ae'
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '72231b5d-c625-484d-8d17-75a7b4c092ae'
        const taskId = '4d652c09-8cea-42a6-8463-3b8355f649c5'
        todolistsApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = (todolistId: string, title: string) => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '72231b5d-c625-484d-8d17-75a7b4c092ae'
        todolistsApi.createTask(todolistId, 'new Task')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = (todolistId: string, taskId: string, title: string) => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '72231b5d-c625-484d-8d17-75a7b4c092ae'
        const taskId = 'ca7eedf2-6525-4d99-8087-8c11c5ac0bf2'
        todolistsApi.updateTask(todolistId, taskId, 'Hello')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

