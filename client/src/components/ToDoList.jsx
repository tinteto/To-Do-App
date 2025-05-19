import { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import styles from './TodoList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import EditTask from "./EditTask";
import taskService from "../services/taskService";

const url = 'http://localhost:3030/jsonstore/todos';

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [taskIdEdit, setTaskIdEdit] = useState(null);
  
  
useEffect(() => {
  taskService.getAllTasks()
  .then(tasks => {
    setTasks(tasks);
  });
}, []);

const statusChangeHandler = (taskId) => {
  setTasks(initialTasks => initialTasks.map(task => task._id === taskId 
    ? {...task, isCompleted: !task.isCompleted}
    : task
  ))
}

const openEditForm = (taskId) => {
setTaskIdEdit(taskId);
}

const closeEditForm = () => {
setShowEdit(false);
setTaskIdEdit(null);
}

const addNewTaskHandler = async (formData) => {
  const text = formData.get('text');

  if(text === "") {
      alert('Missing fields!')
      return;
  }
    
  const newTask = await taskService.createTask(text);
  setTasks(initialTasks => [...initialTasks, newTask]);
  alert("Task created successfully!");
}

const editTaskHandler = async (e) => {
const taskId = taskIdEdit;
e.preventDefault();

const formData = new FormData(e.target.parentElement.parentElement);
const text = formData.get('text');

const updatedTask = await taskService.editTask(taskId, text);
setTasks(initialTasks => initialTasks.map(task => task._id === taskId ? updatedTask : task));
alert('Task edited successfully!');

//Close modal
setTaskIdEdit(null);
}
  
const deleteTaskHandler = async (taskId) => {
await taskService.deleteTask(taskId);

//!filter the deleted tasks from the current state
setTasks(initialTasks => initialTasks.filter(task => task._id !== taskId));
}

  return (
<>
<section className={styles.todoList}>
<h1>Today's Tasks</h1>

<div className={styles.formContainer}>
<form action={addNewTaskHandler}>
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
onOpenEdit={openEditForm}
/>
)}
</ul>



{taskIdEdit && (
    <EditTask 
    taskId={taskIdEdit}
    onCloseEdit={closeEditForm} 
    onEdit={editTaskHandler}
    />
  )}

</section>
</>

  )
}