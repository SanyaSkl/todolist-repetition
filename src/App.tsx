import React from 'react';
import './App.css';
import {Todolist} from './components/Todolist';

function App() {

  let tasks = [
    { id: 1, title: "CSS&HTML", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: false },
    { id: 4, title: "Redux", isDone: false }
  ]

    function removeTask(id: number) {
      let resultTask = tasks.filter( t => t.id !== id)
    }

  return (
      <div className="App">
        <Todolist title="What to learn"
                  tasks = {tasks}
                  removeTask = {removeTask}

        />
      </div>
  );
}


export default App;
