import {useCallback, useState} from "react";
import {v1} from "uuid";
import {TasksStateType} from "../App";
import {todolistId1, todolistId2} from "../id-utils";

export function useTasks() {
    let [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "CSS&HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true}
        ]
    })

    const removeTask = (id: string, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        tasksObj[todolistId] = tasks.filter(t => t.id !== id);
        setTasksObj({...tasksObj});
    }

    const addTask = useCallback((title: string, todolistId: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        tasksObj[todolistId] = [newTask, ...tasks]
        setTasksObj({...tasksObj})
    }, [])

    const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }

    }

    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle
            setTasksObj({...tasksObj})
        }

    }

    const completelyRemoveTasksForTodolist = (todolistId: string) => {
        delete tasksObj[todolistId];
        setTasksObj({...tasksObj})
    }

    const addStateForNewTodolist = (newTodolistId: string) => {
        setTasksObj({...tasksObj,
        [newTodolistId]: []
        })
    }

    return {
        tasksObj,
        removeTask,
        addTask,
        changeStatus,
        changeTaskTitle,
        completelyRemoveTasksForTodolist,
        addStateForNewTodolist
    }
}