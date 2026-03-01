import {EditableSpan} from "@/common/Components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {changeTodolistTitleAC, deleteTodolistAC, Todolist} from "@/features/todolist/model/todolists-reducer.ts";
import styles from './TodolistItem.module.css'

type Props = {
    todolist: Todolist
}

export const TodolistTitle = ({todolist}: Props) => {
    const {id, title} = todolist

    const dispatch = useAppDispatch()

    const changeTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }
    const deleteTodolistHandler = () => {
        dispatch(deleteTodolistAC({id}))
    }

    return (
        <div className={styles.container}>
            <h3><EditableSpan value={title} onChange={changeTodolistTitleHandler}/></h3>
            <IconButton onClick={deleteTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}