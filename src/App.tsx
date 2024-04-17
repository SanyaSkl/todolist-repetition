import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';

export type FilterValuesType = "all" | "completed" | "active"

function App() {

  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: "CSS&HTML", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: false },
    { id: 4, title: "Redux", isDone: false }
  ]);
    let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(id: number) {
      let filteredTasks = tasks.filter( t => t.id !== id);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodolist = tasks;
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }

  return (
      <div className="App">
        <Todolist title="What to learn"
                  tasks = {tasksForTodolist}
                  removeTask = {removeTask}
                  changeFilter = {changeFilter}
        />
      </div>
  );
}


export default App;
