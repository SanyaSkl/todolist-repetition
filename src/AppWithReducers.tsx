import  React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/task-reduser";
import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/todolist-reduser";

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todoLists, dispatchToTodoListsReducer] = useReducer(todolistReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, dispatchToTaskReducer] = useReducer(tasksReducer, {
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
        //const action = removeTaskAC(id, todolistId)
        dispatchToTaskReducer(removeTaskAC(id, todolistId))
        // let tasks = tasks[todolistId];
        // tasks[todolistId] = tasks.filter(t => t.id !== id);
        // setTasksObj({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        //const action = addTaskAC(title, todolistId)
        dispatchToTaskReducer(addTaskAC(title, todolistId))
        // let newTask = {id: v1(), title: title, isDone: false}
        // let tasks = tasks[todolistId]
        // tasks[todolistId] = [newTask, ...tasks]
        // setTasksObj({...tasks})
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatchToTaskReducer(action)
        // let tasks = tasks[todolistId]
        // let task = tasks.find(t => t.id === id)
        // if (task) {
        //     task.isDone = isDone
        //     setTasksObj({...tasks})
        // }
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId)
        dispatchToTaskReducer(action)
        // let tasks = tasks[todolistId]
        // let task = tasks.find(t => t.id === id)
        // if (task) {
        //     task.title = newTitle
        //     setTasksObj({...tasks})
        // }
    }

    let removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodoListsReducer(action)
        dispatchToTaskReducer(action)
        // let filteredTodolist = todoLists.filter(tl => tl.id !== todolistId)
        // setTodoLists(filteredTodolist);
        // delete tasks[todolistId];
        // setTasksObj({...tasks})
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatchToTodoListsReducer(action)
        // const todoList = todoLists.find(tl => tl.id === id)
        // if (todoList) {
        //     todoList.title = newTitle
        //     setTodoLists([...todoLists])
        // }
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchToTodoListsReducer(action)
        dispatchToTaskReducer(action)
        // let todolist: TodolistType = {
        //     id: v1(),
        //     filter: 'all',
        //     title: title
        // }
        // setTodoLists([todolist, ...todoLists]);
        // setTasksObj({
        //     ...tasks,
        //     [todolist.id]: []
        // })
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatchToTodoListsReducer(action)
        // let todolist = todoLists.find(tl => tl.id === todolistId)
        // if (todolist) {
        //     todolist.filter = value
        //     setTodoLists([...todoLists])
        // }
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
                            let tasksForTodolist = tasks[tl.id];
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


export default AppWithReducers;
