import {useCallback, useState} from "react";
import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";
import {todolistId1, todolistId2} from "../id-utils";

export function useTodolists(onTodoListRemoved: (todolistId: string) => void,
                             onTodoListAdded: (todolistId: string) => void) {
    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todolist = todoLists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodoLists([...todoLists])
        }
    }

    const removeTodolist = (todolistId: string) => {
        let filteredTodolist = todoLists.filter(tl => tl.id !== todolistId)
        setTodoLists(filteredTodolist);
        onTodoListRemoved(todolistId)
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        const todoList = todoLists.find(tl => tl.id === id)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    const addTodolist = useCallback((title: string) => {
        let todolist: TodolistType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodoLists([todolist, ...todoLists]);
        onTodoListAdded(todolist.id)
    }, [])

    return {
        todoLists,
        changeFilter,
        removeTodolist,
        changeTodolistTitle,
        addTodolist
    }
}