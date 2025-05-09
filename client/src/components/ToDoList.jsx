import { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import styles from './TodoList.module.css';

const url = 'http://localhost:3030/jsonstore/todos';

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);


useEffect(() => {
fetch(url)
.then(response => response.json())
.then(data => {
  const result = Object.values(data);
  console.log(result);
  
  setTasks(result);
})
  }, []);


  const statusChangeHandler = (taskId) => {
setTasks(initialTasks => initialTasks.map(task => task._id === taskId 
  ? {...task, isCompleted: !task.isCompleted}
  : task
))
  }
    return (
<>
<section className="todo-list">
<h1>Today's Tasks</h1>

<div className="tasksList">
{tasks.map(task =>  <ToDoItem  
key={task._id} 
{...task}
onStatusChange={statusChangeHandler}/>)}
</div>

</section>
</>

  )
}