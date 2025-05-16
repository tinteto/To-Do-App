import styles from './TodoItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSyncAlt, faRedo } from '@fortawesome/free-solid-svg-icons';


export default function ToDoItem ({_id, text, isCompleted, onStatusChange, onEditClick, onDeleteTask }) {
    return (
<>
<li>
  <div className={styles.text}>
  <p className={isCompleted ? styles.textCompleted : styles.textToDo}> {text} </p>
  <p className={isCompleted ? styles['isCompleted'] : styles['toDo']}> {isCompleted ? "Completed" : "Pending"} </p>
  </div>

  <div className={styles.buttons}>
  <button onClick={() => onStatusChange(_id)}> <FontAwesomeIcon icon={faRedo} /> </button>
  <button onClick={() => onEditClick(_id)}> <FontAwesomeIcon icon={faEdit} /> </button>
  <button onClick={() => onDeleteTask(_id)}> <FontAwesomeIcon icon={faTrash} /> </button>
  </div>
</li>
</>
    )
}