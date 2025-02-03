import React, {ChangeEvent, useState} from "react";

export const useAddItemForm = (addItem: (title: string) => void) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const keyDownHandler = (e: React.KeyboardEvent<HTMLElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter') {
            addItem(title)
            setTitle('')
        }
    }

    const addTask = () => {
        if (title.trim() !== "") {
            addItem(title.trim())
            setTitle('')
        } else {
            setError("Title is required")
        }
    }

        return {
            title,
            error,
            onChangeHandler,
            keyDownHandler,
            addTask
        }
}