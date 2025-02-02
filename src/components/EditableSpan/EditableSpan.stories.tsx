import {action} from '@storybook/addon-actions';
import {Meta} from "@storybook/react";
import React from "react";
import {EditableSpan} from "./EditableSpan";

const meta: Meta<typeof EditableSpan> = {
    title: "Components/EditableSpan", // The title for Storybook hierarchy
    component: EditableSpan,
}

export default meta

const changeCallback= action("Value changed");


export const EditableSpanBaseExample = () => {
    return <EditableSpan title={'Start value'} onChange={changeCallback}/>
};


