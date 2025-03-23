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
    const [todolistId, setTodolistId] = useState<string>('')

    const getTask = () => {
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <button onClick={getTask}>get task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTask = () => {
        todolistsApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <input placeholder={'taskId'} value={taskId}
                   onChange={(e) => {
                       setTaskId(e.currentTarget.value)
                   }}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const createTask = () => {
        todolistsApi.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <input placeholder={'task title'} value={taskTitle}
                   onChange={(e) => {
                       setTaskTitle(e.currentTarget.value)
                   }}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('description1')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const updateTask = () => {
        todolistsApi.updateTask(todolistId, taskId, {
            title: title,
            description: '',
            status: status,
            priority: priority,
            startDate: '',
            deadline: ''

        })
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <input placeholder={'new task title'} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
            <input placeholder={'description'} value={description} onChange={(e) => {setDescription(e.currentTarget.value)}}/>
            <input placeholder={'status'} value={status} type='number' onChange={(e) => {setStatus(+e.currentTarget.value)}}/>
            <input placeholder={'priority'} value={priority} type='number' onChange={(e) => {setPriority(+e.currentTarget.value)}}/>
            <button onClick={updateTask}>Update Task</button>
        </div>
    </div>
}

