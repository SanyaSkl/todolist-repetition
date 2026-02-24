import {TodolistItem} from "@/common/Components/TodolistItem.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/model/todolists-selectors.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {Grid, Paper} from "@mui/material";

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    return (
        <>
            {todolists.map(todolist => {
                const todolistTasks = tasks[todolist.id] || []
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
                            <TodolistItem
                                key={todolist.id}
                                todolist={todolist}
                                tasks={filteredTasks}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </>
    )
}