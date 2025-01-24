//React and Hooks
import React, {useState} from 'react'
import axiosInstance from '../../api/axiosInstance'

//Style and Components
import style from './InProgress.module.css'
import Top from './Top'
import TaskBox from './TaskBox'
import AddTaskPopup from './AddTaskPopup'
import DropArea from './DropArea';

function InProgress({tasks,setTasks,section,setActiveBox,onDrop}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  //Opens Add task Popup
  const handleAddClick = () => {
    setIsPopupOpen(true);
  };

  //Close Add task Popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  //Handles New task Submission and send Post req. to Backend and update the state
  const handleSubmit = async (taskData) => {
    try {
      const response = await axiosInstance.post('/addTaskInProgress', taskData);

      if(response.data.success){
        console.log(response.data.message);
        setTasks([...tasks, taskData]);
        setIsPopupOpen(false);
      }
      else{
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error adding task in InProgress:', error);
    }
  };

  //Delete the task from the Array
  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter(task => task._id != taskId));
  }

  //Edit the task in the array
  const handleTaskEdit = (taskId, editedData) => {
    setTasks(tasks.map(task => 
      task._id === taskId ? {...task, ...editedData} : task
    ));
  };

  return (
    <div className={style.todoContainer}
    >
      {/* <span>Active box - {activeBox}</span> */}
      <Top text={`In Progress (${tasks.length})`} onAddClick={handleAddClick}/>

      {/* The DropArea component acts as a target for dropping tasks in starting */}
      <DropArea onDrop={ () => onDrop(section, 0)} />

      {tasks.map((task,index) => (
        // we used react.fragment to return multiple elements (TaskBox + DropArea) without adding extra DOM nodes
        <React.Fragment key={index}>
        <TaskBox
          id={task._id}
          title={task.title}
          description={task.description}
          progress={task.progress}
          date={task.date}
          index={index}
          section={section}
          setActiveBox={setActiveBox}
          onDelete={handleTaskDelete}
          onEdit = {handleTaskEdit}
          commentCount = {task.commentCount}
        />

        <DropArea onDrop={ () => onDrop(section, index+1)}/>
        </React.Fragment>
      ))}

      {isPopupOpen && (
        <AddTaskPopup 
          section={'InProgress'}
          onClose={handleClosePopup}
          onSubmit={handleSubmit}
          />
        )}

    </div>
  )
}

export default InProgress