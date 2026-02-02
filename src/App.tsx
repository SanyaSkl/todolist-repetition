import './App.css'
import MenuIcon from '@mui/icons-material/Menu'
import {createTheme, Grid, Paper, ThemeProvider} from '@mui/material';
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import IconButton from '@mui/material/IconButton'
import Switch from '@mui/material/Switch'
import Toolbar from '@mui/material/Toolbar'
import {useReducer, useState} from 'react'
import {v1} from 'uuid';
import {CreateItemForm} from './Components/CreateItemForm.tsx';
import {TodolistItem} from './Components/TodolistItem.tsx'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from './model/todolists-reducer.ts';
import {NavButton} from './Styles/NavButton.ts';
import {containerSx} from './Styles/TodolistItem.styles.ts';

type ThemeMode = 'dark' | 'light'

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = {
    [key: string]: Task[]
}

export const App = () => {

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])
    const [tasks, setTasks] = useState<TasksState>({})
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }

    const createTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, isDone} : task)})
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatchToTodolists(changeTodolistFilterAC({id: todolistId, filter}))
    }

    const deleteTodolist = (todolistId: string) => {
        dispatchToTodolists(deleteTodolistAC(todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatchToTodolists(action)
        setTasks({...tasks, [action.payload.id]: []})
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC({id: todolistId, title}))
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="app">
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar>
                        <Container maxWidth={'lg'} sx={containerSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode}/>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={'lg'}>
                    <Grid container sx={{mb: '30px'}}>
                        <CreateItemForm onCreateItem={createTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todolists.map(todolist => {
                            const todolistTasks = tasks[todolist.id]
                            let filteredTasks = todolistTasks
                            if (todolist.filter === 'active') {
                                filteredTasks = todolistTasks.filter(task => !task.isDone)
                            }
                            if (todolist.filter === 'completed') {
                                filteredTasks = todolistTasks.filter(task => task.isDone)
                            }
                            return (
                                <Grid key={todolist.id}>
                                    <Paper sx={{mb: '30px'}}>
                                        <TodolistItem key={todolist.id}
                                                      todolist={todolist}
                                                      tasks={filteredTasks}
                                                      deleteTask={deleteTask}
                                                      changeFilter={changeFilter}
                                                      createTask={createTask}
                                                      changeTaskStatus={changeTaskStatus}
                                                      deleteTodolist={deleteTodolist}
                                                      changeTaskTitle={changeTaskTitle}
                                                      changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    )
}
