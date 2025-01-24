//React and Hooks
import React, { useState } from 'react';

//Style
import style from './AddTaskPopup.module.css';

function AddTaskPopup({section, onClose, onSubmit }) {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    progress: '',
    date: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!taskData.title.trim()) newErrors.title = 'Title is required';
    if (!taskData.description.trim()) newErrors.description = 'Description is required';
    if (!taskData.progress) {
      newErrors.progress = 'Progress is required';
    }
    else{  
      if ((section === 'todo' || section === 'inProgress') && Number(taskData.progress) === 10) {
        newErrors.progress = 'Completed tasks (progress 10) should be added to Done section';
      }
      if(section === 'done' && Number(taskData.progress < 10)) {
        newErrors.progress = 'Tasks in Done section must be completed (progress 10)';
      }
      if (Number(taskData.progress) < 0 || Number(taskData.progress) > 10) {
        newErrors.progress = 'Progress must be between 0 and 10';
      }
    }
    
    if (!taskData.date) newErrors.date = 'Date is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    onSubmit(taskData);
  };

  return (
    <div className={style.popup}>
      <div className={style.popupContent}>
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Title"
            value={taskData.title}
            onChange={(e) => setTaskData({...taskData, title: e.target.value})}
          />
          {errors.title && <span className={style.error}>{errors.title}</span>}

          <textarea
            placeholder="Description"
            value={taskData.description}
            onChange={(e) => setTaskData({...taskData, description: e.target.value})}
          />
          {errors.description && <span className={style.error}>{errors.description}</span>}

          <input
            type="number"
            placeholder='Progress (0-10)'
            min='0'
            max='10'
            value={taskData.progress}
            onChange={(e) => setTaskData({...taskData, progress: e.target.value})}
          />
          {errors.progress && <span className={style.error}>{errors.progress}</span>}

          <input
            type="date"
            value={taskData.date}
            onChange={(e) => setTaskData({...taskData, date: e.target.value})}
          />
          {errors.date && <span className={style.error}>{errors.date}</span>}

          <div className={style.buttons}>
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskPopup;