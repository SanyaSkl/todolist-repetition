import React, {ChangeEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const keyDownHandler = (e: React.KeyboardEvent<HTMLElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            props.addItem(title)
            setTitle('')
        }
    }

    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError("Title is required")
        }

    }

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
}