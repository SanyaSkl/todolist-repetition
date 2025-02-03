import {ControlPoint} from "@mui/icons-material";
import {IconButton, TextField} from "@mui/material";
import React from "react";
import {useAddItemForm} from "./hooks/useAddItemForm";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    const {
        title,
        error,
        onChangeHandler,
        keyDownHandler,
        addTask
    } = useAddItemForm(props.addItem)

    return (
        <div>
            <TextField
                variant={'outlined'}
                label={'Type value'}
                value={title}
                onChange={onChangeHandler}
                onKeyDown={keyDownHandler}
                error={!!error}
                helperText={error}
            />

            <IconButton onClick={addTask} color={'primary'}>
                <ControlPoint/>
            </IconButton>

        </div>
    )
})