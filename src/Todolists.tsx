import {TodolistItem} from "@/common/Components/TodolistItem.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/model/todolists-selectors.ts";
import {Grid, Paper} from "@mui/material";

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)

    return (
        <>
            {todolists.map(todolist => (
                <Grid key={todolist.id}>
                    <Paper sx={{mb: '30px'}}>
                        <TodolistItem todolist={todolist}/>
                    </Paper>
                </Grid>
            ))}
        </>
    )
}