import React from 'react';
import './App.css';
import {Todolist} from './components/Todolist';

function App() {

  let tasks1 = [
    { id: 1, title: "CSS&HTML", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: false },
    { id: 4, title: "Redux", isDone: false }
  ]

  let tasks2 = [
    { id: 1, title: "Legend", isDone: true },
    { id: 2, title: "The Take", isDone: true },
    { id: 3, title: "Breaking Bad", isDone: true }
  ]

  return (
      <div className="App">
        <Todolist title="What to learn" tasks = {tasks1}/>
        <Todolist title="Movies" tasks = {tasks2}/>
      </div>
  );
}


export default App;
