import AddBoxIcon from '@mui/icons-material/AddBox'
import {TextField} from '@mui/material';
import IconButton from '@mui/material/IconButton'
import {type ChangeEvent, type KeyboardEvent, useState} from 'react'

type Props = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm = ({onCreateItem}: Props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            onCreateItem(trimmedTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null)
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }

    return (
        <div>
            <TextField label={'Enter a title'}
                       variant={'outlined'}
                       size={'small'}
                       error={!!error}
                       helperText={error}
                       className={error ? 'error' : ''}
                       value={title}
                       onChange={changeItemTitleHandler}
                       onKeyDown={createItemOnEnterHandler}/>
            <IconButton onClick={createItemHandler} color={'primary'}>
                <AddBoxIcon/>
            </IconButton>
        </div>
    )
}