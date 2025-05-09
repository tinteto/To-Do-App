import styles from './TodoItem.module.css';

export default function ToDoItem ({_id, text, isCompleted, onStatusChange }) {
    return (
<>
<li>
  <div className={styles.text}>
  <p className={isCompleted ? styles.textCompleted : styles.textToDo}> {text} </p>
  <p className={isCompleted ? styles['isCompleted'] : styles['toDo']}> {isCompleted ? "done" : "pending"} </p>
  </div>
  <button onClick={() => onStatusChange(_id)}>Change Status</button>
</li>
</>
    )
}