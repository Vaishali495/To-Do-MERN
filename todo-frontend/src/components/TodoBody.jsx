//React and Hooks
import React, {useState, useEffect} from 'react'
import axiosInstance from '../../api/axiosInstance';

//Style and Components
import style from './TodoBody.module.css'
import TodoHeader from './TodoHeader'
import Menu from './Menu'
import Todo from './Todo'
import InProgress from './InProgress'
import Done from './Done'
import { useTheme } from "./ThemeProvider";

function todoBody() {

    // State Management
    const { theme } = useTheme();
    const [activeBox, setActiveBox] = useState(null);
    const [todoTasks, setTodoTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);

    //Fetch all tasks on component mount
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axiosInstance.get('/getAllTasks');
                if(response.data.success){
                    // Update state with fetched tasks
                    setTodoTasks(response.data.todoTask);
                    setInProgressTasks(response.data.inProgressTask);
                    setDoneTasks(response.data.doneTask);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    },[]);

    const onDrop = async (targetSection,position) => {
        console.log("Target Secion:",targetSection);
        console.log("Active Box:",activeBox);
        if(activeBox == null || activeBox === undefined) return;

        // Get task
        let task;
        if(activeBox.section === 'todo') {
            task = todoTasks[activeBox.index];
        } else if(activeBox.section === 'inProgress') {
            task = inProgressTasks[activeBox.index];
        } else if(activeBox.section === 'done') {
            if (targetSection === 'todo' || targetSection === 'inProgress') {
                alert('Completed tasks cannot be moved to Todo or In Progress');
                return;
            }
            task = doneTasks[activeBox.index];
        }

        try {
            //Update the section of the task in the DB
            const response = await axiosInstance.put('/updateTaskSection', {
                taskId: task._id,
                newSection: targetSection
            });

            if(response.data.success) {
                    //Set progress 10 if tasks move to the done section
                    if(targetSection === 'done') {
                        task = {...task, progress: '10'};
                    }

                    // Remove from source
                    if(activeBox.section === 'todo') {
                        setTodoTasks(prev => prev.filter((_, i) => i !== activeBox.index));

                    } else if(activeBox.section === 'inProgress') {
                        setInProgressTasks(prev => prev.filter((_, i) => i !== activeBox.index));

                    } else if(activeBox.section === 'done') {
                        setDoneTasks(prev => prev.filter((_, i) => i !== activeBox.index));
                    }

                    // Add to target
                    if(targetSection === 'todo') {
                        setTodoTasks(prev => [...prev.slice(0, position), task, ...prev.slice(position)]);

                    } else if(targetSection === 'inProgress') {
                        setInProgressTasks(prev => [...prev.slice(0, position), task, ...prev.slice(position)]);    
                        
                    } else if(targetSection === 'done') {
                        setDoneTasks(prev => [...prev.slice(0, position), task, ...prev.slice(position)]);
                    }
            }
    } catch (error) {
        console.error('Error updating task section:', error);
    }

        setActiveBox(null);
    };

  return (
    <div className={`${style['main-container']} ${theme === 'dark' ? style.darkTheme : ''}`}>

        <div className={`${style.header} ${theme === 'dark' ? style.darkHeader : ''}`}>
            <TodoHeader />
        </div>

        <div className={`${style.menu} ${theme === 'dark' ? style.darkMenu : ''}`}>
            <Menu />
        </div>

        {/* Div wraps all the three sections */}
        <div className={style['wrapper-div']}>

            {/* Todo section */}
            <div className={`${style['todo-div']} ${theme === 'dark' ? style['todo-div-dark'] : ''}`}>
                <Todo 
                tasks={todoTasks}
                setTasks={setTodoTasks}
                section='todo'
                setActiveBox={index => setActiveBox({section: 'todo', index})}
                onDrop={onDrop}
                />
            </div>
            
            {/* In progress section */}
            <div className={`${style['inProgress-div']} ${theme === 'dark' ? style['inProgress-div-dark'] : ''}`}>
                <InProgress 
                tasks={inProgressTasks}
                setTasks={setInProgressTasks}
                section='inProgress'
                setActiveBox={index => setActiveBox({section: 'inProgress', index})}
                onDrop={onDrop}
                />
            </div>

            {/* Done section */}
            <div className={`${style['done-div']} ${theme === 'dark' ? style['done-div-dark'] : ''}`}>
                <Done 
                tasks={doneTasks}
                setTasks={setDoneTasks}
                section='done'
                setActiveBox={index => setActiveBox({section: 'done', index})}
                onDrop={onDrop}
                />
            </div>

        </div>
    </div>
  )
}

export default todoBody