import DeleteIcon from '@mui/icons-material/Delete'
import {Box, Checkbox} from '@mui/material';
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import {ChangeEvent} from 'react';
import {containerSx, getListItemSx} from '@/Styles/TodolistItem.styles.ts';
import {CreateItemForm} from './CreateItemForm.tsx';
import {EditableSpan} from './EditableSpan.tsx';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    FilterValues,
    Todolist
} from "@/model/todolists-reducer.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC, Task} from "@/model/task-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";


type Props = {
    todolist: Todolist
    tasks: Task[]
}

export const TodolistItem = (props: Props) => {
    const dispatch = useAppDispatch()

    const {
        todolist: {id, title, filter},
        tasks,
    } = props

    const changeFilterHandler = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }
    const deleteTodolistHandler = () => {
        dispatch(deleteTodolistAC({id}))
    }
    const createTaskHandler = (title: string) => {
        dispatch(createTaskAC(id, title))
    }
    const changeTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }

    return (
        <div>
            <div className="container">
                <h3><EditableSpan value={title} onChange={changeTodolistTitleHandler}/></h3>
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <CreateItemForm onCreateItem={createTaskHandler}/>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasks.map(task => {

                        const deleteTaskHandler = () => {
                            dispatch(deleteTaskAC({todolistId: id, taskId: task.id}))
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            dispatch(changeTaskTitleAC({todolistId: id, taskId: task.id, title}))
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC({
                                todolistId: id,
                                taskId: task.id,
                                isDone: e.currentTarget.checked
                            }))
                        }

                        return (
                            <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                                <div>
                                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                </div>
                                <IconButton onClick={deleteTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}

            <div>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => changeFilterHandler('all')}>
                    All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilterHandler('active')}>
                    Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilterHandler('completed')}>
                    Completed
                </Button>
            </div>
            <Box sx={containerSx}>{/*...*/}</Box>
        </div>
    )
}