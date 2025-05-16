import { useEffect, useState } from "react"

export default function EditTask({taskId, onClose, onEdit}) {

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
            <div className="overlay">
            <div className="modal">
                <div className="user-container">
                    <header className="headers">
                        <h2>Edit Task</h2>
                    </header>
                    <form>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="taskName">Task</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-user"></i></span>
                                    <input id="taskName" name="taskName" type="text" defaultValue={task.text} />
                                </div>
                            </div>

                        </div>
                        <div id="form-actions">
                            {taskId &&
                               <button id="actionEdit" className="btn" type="submit" onClick={onEdit}>Edit</button>
                            }
                               <button id="actionCancel" className="btn" type="button" onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}