import { useEffect, useState } from "react";
import styles from './EditTask.module.css';

export default function EditTask({taskId, onCloseEdit, onEdit}) {

    const [task, setTask] = useState({});

    useEffect(() => {
        if(!taskId) {
            return;
        }

        fetch(`http://localhost:3030/jsonstore/todos/${taskId}`)
        .then(response => response.json())
        .then(result => setTask(result)
        );
    }, [taskId]);

    return (
        <>
            <div className={styles.overlay} >
            <div className={styles.modal}>
                <div className="user-container">
                    <form>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="taskName">Edit Task</label>
                                <div className={styles.inputWrapper}>
                                    <span><i className="fa-solid fa-user"></i></span>
                                    <input id="taskName" name="text" type="text" defaultValue={task.text} />
                                </div>
                            </div>

                        </div>
                        <div id={styles.formActions}>
                            {taskId &&
                               <button id={styles.actionEdit} className={styles.btn} type="submit" onClick={onEdit}>Edit</button>
                            }
                               <button id={styles.actionCancel} className={styles.btn} type="button" onClick={onCloseEdit}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}