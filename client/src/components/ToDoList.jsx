import { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import styles from './TodoList.module.css';

const url = 'http://localhost:3030/data/ideas';

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);


useEffect(() => {
fetch(url)
.then(response => response.json())
.then(data => {  
  setTasks(data);
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


<ul className={styles.tasksList}>
{tasks.map(task => 
<ToDoItem  
key={task._id} 
{...task}
onStatusChange={statusChangeHandler}/>
)}
</ul>

</section>
</>

  )
}