import styles from './TodoItem.module.css';

export default function ToDoItem ({_id, text, isCompleted, onStatusChange }) {
    return (
<>
<div className="single-task">
  <span className={isCompleted ? styles['textCompleted'] : styles['textToDo']}>✔️ {text}</span>
  <span className={isCompleted ? styles['isCompleted'] : styles['toDo']}> {isCompleted ? "Done" : "Pending"} </span>
  <button onClick={() => onStatusChange(_id)}>Change Status</button>
</div>
</>
    )
}