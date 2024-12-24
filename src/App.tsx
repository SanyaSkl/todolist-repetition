import React, {useCallback, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "CSS&HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true}
        ]
    })

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        tasksObj[todolistId] = tasks.filter(t => t.id !== id);
        setTasksObj({...tasksObj});
    }

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todoLists.filter(tl => tl.id !== todolistId)
        setTodoLists(filteredTodolist);
        delete tasksObj[todolistId];
        setTasksObj({...tasksObj})
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const todoList = todoLists.find(tl => tl.id === id)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    const addTask = useCallback( (title: string, todolistId: string) => {
        let newTask =
            {
                id: v1(),
                title: title,
                isDone: false
            }
        let tasks = tasksObj[todolistId]
        tasksObj[todolistId] = [newTask, ...tasks]
        setTasksObj({...tasksObj})
    }, [] )

    const addTodolist = useCallback( (title: string) => {
        let todolist: TodolistType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodoLists([todolist, ...todoLists]);
        setTasksObj({
            ...tasksObj,
            [todolist.id]: []
        })
    }, [] )

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }

    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle
            setTasksObj({...tasksObj})
        }

    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todoLists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        News
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={ {padding: '20px'} }>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map((tl) => {
                            let tasksForTodolist = tasksObj[tl.id];
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                            }
                            if (tl.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                            }
                            return (
                                <Grid item>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


export default App;
