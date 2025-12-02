import {FilterValues, Task} from '../App.tsx'
import {Button} from './Button.tsx';

type Props = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: number) => void
    changeFilter: (filter: FilterValues) => void
    filteredVal: Task[]
}

export const TodolistItem = ({title, tasks, deleteTask, changeFilter, filteredVal}: Props) => {

    // const [filter, setFilter] = useState('all')
    //
    // const changeFilter = (filter: FilterValues) => {
    //     setFilter(filter)
    // }
    //
    // const filteredFoo = () => {
    //
    //     switch (filter) {
    //         case 'completed': {
    //             return tasks.filter(task => task.isDone)
    //         }
    //         case 'active': {
    //             return tasks.filter(task => !task.isDone)
    //         }
    //         default:
    //             return tasks
    //     }
    // }
    //
    // let filteredVal = filteredFoo()


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {filteredVal.map(task => {
                        return (
                            <li key={task.id}>
                                <Button onClick={() => deleteTask(task.id)} title={'x'}/>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'} onClick={() => changeFilter('all')}/>
                <Button title={'Active'} onClick={() => changeFilter('active')}/>
                <Button title={'Completed'} onClick={() => changeFilter('completed')}/>
            </div>
        </div>
    )
}