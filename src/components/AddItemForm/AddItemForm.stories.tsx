import {action} from '@storybook/addon-actions';
import {Meta} from "@storybook/react";
import React from "react";
import {Task} from "../Task";
import {AddItemForm} from "./AddItemForm";

const meta: Meta<typeof AddItemForm> = {
    title: "Components/AddItemForm", // The title for Storybook hierarchy
    component: AddItemForm,
}

export default meta

const changeTaskStatusCallback= action("Status changed");
const changeTaskTitleCallback = action("Title changed");
const removeTaskStatusCallback = action("Status changed");

export const AddItemFormBaseExample = () => {
    return (
        <>
            <Task
                task={ { id: '1', isDone: true, title: 'CSS'}}
                removeTask={removeTaskStatusCallback}
                changeTaskStatus={changeTaskStatusCallback}
                changeTaskTitle={changeTaskTitleCallback}
                todolistId={'todolistId1'}
            />
            <Task
                task={ { id: '2', isDone: false, title: 'JS'}}
                removeTask={removeTaskStatusCallback}
                changeTaskStatus={changeTaskStatusCallback}
                changeTaskTitle={changeTaskTitleCallback}
                todolistId={'todolistId2'}
            />
        </>
    )


};


