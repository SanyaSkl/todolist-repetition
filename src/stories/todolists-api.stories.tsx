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
    const [todolistTitle, setTodolistTitle] = useState<string>('')

    function createNewTodolist() {
        todolistsApi.createTodolist(todolistTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'Create Todolist'} value={todolistTitle}
                   onChange={(e) => setTodolistTitle(e.currentTarget.value)}/>
            <button onClick={createNewTodolist}>Create Todolist</button>
        </div>
    </div>
}

export const DeleteTodolists = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodolist = () => {
        todolistsApi.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={deleteTodolist}>Delete Todolist</button>
        </div>
    </div>
}

export const UpdateTodolistsTitle = (id: string, title: string) => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [todolistTitle, setTodolistTitle] = useState<string>('')

    const updateTodolist = () => {
        todolistsApi.updateTodolist(todolistId, todolistTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'NewTodolistTitle'} value={todolistTitle}
                   onChange={(e) => setTodolistTitle(e.currentTarget.value)}/>
            <button onClick={updateTodolist}>Update Todolist</button>
        </div>
    </div>
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

