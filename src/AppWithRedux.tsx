import {Menu} from "@mui/icons-material";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import './App.css';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {TaskType, Todolist} from './components/Todolist';
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task-reduser";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reduser";

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const removeTask = useCallback((id: string, todolistId: string) => {
        //const action = removeTaskAC(id, todolistId)
        dispatch(removeTaskAC(id, todolistId))
        // let tasks = tasksObj[todolistId];
        // tasksObj[todolistId] = tasks.filter(t => t.id !== id);
        // setTasksObj({...tasksObj});
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        //const action = addTaskAC(title, todolistId)
        dispatch(addTaskAC(title, todolistId))
        // let newTask = {id: v1(), title: title, isDone: false}
        // let tasks = tasksObj[todolistId]
        // tasksObj[todolistId] = [newTask, ...tasks]
        // setTasksObj({...tasksObj})
    }, [dispatch])

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatch(action)
        // let tasks = tasksObj[todolistId]
        // let task = tasks.find(t => t.id === id)
        // if (task) {
        //     task.isDone = isDone
        //     setTasksObj({...tasksObj})
        // }
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        const action = changeTaskTitleAC(id, newTitle, todolistId)
        dispatch(action)
        // let tasks = tasksObj[todolistId]
        // let task = tasks.find(t => t.id === id)
        // if (task) {
        //     task.title = newTitle
        //     setTasksObj({...tasksObj})
        // }
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
        // let filteredTodolist = todoLists.filter(tl => tl.id !== todolistId)
        // setTodoLists(filteredTodolist);
        // delete tasksObj[todolistId];
        // setTasksObj({...tasksObj})
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatch(action)
        // const todoList = todoLists.find(tl => tl.id === id)
        // if (todoList) {
        //     todoList.title = newTitle
        //     setTodoLists([...todoLists])
        // }
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
        // let todolist: TodolistType = {
        //     id: v1(),
        //     filter: 'all',
        //     title: title
        // }
        // setTodoLists([todolist, ...todoLists]);
        // setTasksObj({
        //     ...tasksObj,
        //     [todolist.id]: []
        // })
    }, [dispatch])

    const changeFilter =(value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
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
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {
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


export default AppWithRedux;
