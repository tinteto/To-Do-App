import { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import styles from './TodoList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import EditTask from "./EditTask";

const url = 'http://localhost:3030/jsonstore/todos';

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [taskIdEdit, setTaskIdEdit] = useState(null);
  
  


useEffect(() => {
fetch(url)
.then(response => response.json())
.then(data => {
const result = Object.values(data);

setTasks(result);
})
  }, []);

const onSubmit = async (formData) => {
    const taskData = Object.fromEntries(formData);
    
    if(taskData.text === "") {
      alert('Missing fields!')
      return;
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',   
      },
      body: JSON.stringify(taskData)
    });
    
    if (response.ok) {
      const result = await response.json();
      setTasks(initialTasks => [...initialTasks, result]);
      alert('Task created successfully!');
    }
}

const editTaskHandler = (taskId) => {
setTaskIdEdit(taskId);
}

const closeTaskHandler = () => {
setShowEdit(false);
setTaskIdEdit(null);
}

const statusChangeHandler = (taskId) => {
setTasks(initialTasks => initialTasks.map(task => task._id === taskId 
  ? {...task, isCompleted: !task.isCompleted}
  : task
))
}


const saveEditTaskHandler = async (e) => {
const taskId = taskIdEdit;

e.preventDefault();

  // const response = await fetch(`${url}/${taskId}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',  
  //   },
  //   body: JSON.stringify({taskData, id: taskId})
  // })

  // if(response.ok) {
  //   const result = await response.json();
  //   setTasks(initialTasks => [...initialTasks, result]);
  //   alert('Task edited successfully!');
  // }
}
  

const deleteTaskHandler = async (taskId) => {
const response = await fetch(`${url}/${taskId}`, { method: 'DELETE' });

if(response.ok) {
  //!filter the deleted tasks from the current state
  setTasks(initialTasks => initialTasks.filter(task => task._id !== taskId));
} else {
  console.error('Failed to delete task!')
}

}

  return (
<>
<section className={styles.todoList}>
<h1>Today's Tasks</h1>

<div className={styles.formContainer}>
<form action={onSubmit}>
  <input type="text" name="text" className="newTask" placeholder="Add new task"/>
  <button className={styles.btnAdd}> <FontAwesomeIcon icon={faPlusCircle} /> </button>
</form>
</div>

<ul className={styles.tasksList}>
{tasks.map(task => 
<ToDoItem  
key={task._id} 
{...task}
onStatusChange={statusChangeHandler}
onDeleteTask={deleteTaskHandler}
onEditClick={editTaskHandler}
/>
)}
</ul>



{taskIdEdit && (
    <EditTask 
    taskId={taskIdEdit}
    onClose={closeTaskHandler} 
    onEdit={saveEditTaskHandler}
    />
  )}

</section>
</>

  )
}