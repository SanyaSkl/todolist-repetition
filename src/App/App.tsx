import {Menu} from "@mui/icons-material";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import React from 'react';
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {TaskType, Todolist} from '../components/Todolist';
import './App.css';
import {useTasks} from "./hooks/useTasks";
import {useTodolists} from "./hooks/useTodolists";

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
    const {
        tasksObj,
        removeTask,
        addTask,
        changeStatus,
        changeTaskTitle,
        completelyRemoveTasksForTodolist,
        addStateForNewTodolist
    } = useTasks()

    let {
        todoLists,
        changeFilter,
        removeTodolist,
        changeTodolistTitle,
        addTodolist
    } = useTodolists(completelyRemoveTasksForTodolist,
        addStateForNewTodolist)


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
