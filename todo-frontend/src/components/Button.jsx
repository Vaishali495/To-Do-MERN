//React and Hooks
import React, {useState} from "react";
import style from "./Button.module.css";

//Components
import axiosInstance from "../../api/axiosInstance";
import EditTaskPopup from "./EditTaskPopup";

function Button({ onClose, setButton, taskId, task, onTaskDelete, onTaskEdit,section}) {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  //Delete the Task from the DB and UI
  const handleDeleteTask = async () => {
      const response = await axiosInstance.delete("/deleteTask", {
          data: { taskId: taskId },
        });
        if (response.data.success) {
            console.log(response.data.message);
            onTaskDelete(taskId); //callback to parent
            setButton(false);
        } else {
            console.log(response.data.message);
        }
    };

    const handleEditTask = async () => {
      setIsEditPopupOpen(true);
    };

    const handleEditSubmit = async (editedData) => {
        try {
            const response = await axiosInstance.put('/editTask', {
                taskId: taskId,
                ...editedData   //(without spread operator need to manually list each property)
            });
            if(response.data.success) {
                onTaskEdit(editedData);
                setIsEditPopupOpen(false);
                setButton(false);
            }
            else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.error("Error editing task:", error);
        }
    }

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.popup} onClick={(e) => e.stopPropagation()}>

        <button className={style.button} onClick={handleEditTask}>
          Edit
        </button>

        <button className={style.button} onClick={handleDeleteTask}>
          Delete
        </button>

        <button
          className={`${style.button} ${style.delButton}`}
          onClick={onClose}
        >
          Close
        </button>

      </div>

      {isEditPopupOpen && (
        <EditTaskPopup
          taskId = {taskId}
          task= {task}
          onClose={() => setIsEditPopupOpen(false)}
          onSubmit={handleEditSubmit}
          section={section}
        />
      )}

    </div>
  );
}

export default Button;