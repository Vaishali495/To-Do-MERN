import React,{useState} from 'react'
import Top from './Top';
import style from './DynamicTemplate.module.css'
import AddTaskPopup from './AddTaskPopup';

function DynamicTemplate({ template,updateTasks }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddClick = () => {      
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = () => {
    console.log("am in handleSubmit");
    const newTask = { name: taskName, id: Date.now() }; // Example task structure
    console.log(newTask);
    updateTasks(template.name, newTask);
    setIsPopupOpen(false);
  }

  return (
    <div className={style.DynamicTemplate}>
      <Top text={`${template.name}`} onAddClick={handleAddClick}/>
      {/* Add drop area also */}

      {/* Taskbox component  */}
      

      {/* Add drop area also */}

      {isPopupOpen && (
        <AddTaskPopup 
          section={`${name}`}
          onClose={handleClosePopup}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

export default DynamicTemplate