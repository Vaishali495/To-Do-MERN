const express = require('express');
const app = express();
const taskModel = require('../models/taskSchema');

app.use(express.urlencoded({ extended: true }));   
app.use(express.json());

exports.AddTaskInTodo = async (req,res) => {
    try{
        // console.log("Am in AddTaskInTodo");
        // console.log("req=",req);
        const {title,description,progress,date} = req.body;

        if (!title || !description || !progress || !date) {
            return res.status(400).json({ 
                success:false,
                error: "All fields are required" 
            });
        }

        //add the task in the database
        const task =  await taskModel.create({
            title: title,
            description: description,
            progress: progress,
            date: date,
            section: 'todo',
        })
        console.log("Add Task in todo =",task);
        res.status(200).json({
            success: true, 
            message: "successfully task added in Todo" 
        });
    }
    catch (error) {
        console.error("error in AddTaskInTodo:",error);
    }
}

exports.AddTaskInProgress = async (req,res) => {
    try {
        // console.log("Am in AddTaskInProgress");
        const {title,description,progress,date} = req.body;

        if (!title || !description || !progress || !date) {
            return res.status(400).json({ 
                success:false,
                error: "All fields are required" 
            });
        }

        //add the task in the database
        const task =  await taskModel.create({
            title: title,
            description: description,
            progress: progress,
            date: date,
            section: 'inProgress',
        })
        console.log("Add Task in inProgress =",task);
        res.status(200).json({
            success: true, 
            message: "successfully task added in Inprogress" 
        });
        
    } catch (error) {
        console.error("error in AddTaskInProgress:",error);
    }
}

exports.AddTaskInDone = async (req,res) => {
    try {
        // console.log("Am in AddTaskInDone");
        const {title,description,progress,date} = req.body;

        if (!title || !description || !progress || !date) {
            return res.status(400).json({ 
                success:false,
                error: "All fields are required" 
            });
        }

        //add the task in the database
        const task =  await taskModel.create({
            title: title,
            description: description,
            progress: progress,
            date: date,
            section: 'done',
        })
        console.log("Add Task in Done =",task);
        res.status(200).json({
            success: true, 
            message: "successfully task added in Done" 
        });
        
    } catch (error) {
        console.error("error in AddTaskInDone:",error);
    }
}

exports.getAllTasks = async (req,res) => {
    try {
        // console.log("Am in getAllTasks");

        // Get tasks with comment counts using aggregation
        const tasks = await taskModel.aggregate([
            {
                $match: { isDeleted: false }
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'taskId',
                    as: 'comments'
                }
            },
            {
                $addFields: {
                    commentCount: { $size: '$comments' }
                }
            },
            {
                $project: {
                    comments: 0 // Remove comments array from result
                }
            }
        ]);

        // Separate tasks by section
        const todoTask = tasks.filter(task => task.section === 'todo');
        const inProgressTask = tasks.filter(task => task.section === 'inProgress');
        const doneTask = tasks.filter(task => task.section === 'done');

        res.status(200).json({
            success: true,
            todoTask,
            inProgressTask,
            doneTask
        });
        
    } catch (error) {
        console.error("error in getTodoTask:",error);
    }
}

//Not a good approach to call DB 3 times and I also want the Number of comments so that's why I use the aggregate 

// const todoTask = await taskModel.find({section: 'todo', isDeleted: false});
//         const inProgressTask = await taskModel.find({section: 'inProgress', isDeleted: false});
//         const doneTask = await taskModel.find({section: 'done', isDeleted: false});
//         res.status(200).json({
//             success: true, 
//             todoTask,
//             inProgressTask,
//             doneTask,
//         });

exports.deleteTask = async (req,res) => {
    try {
        // console.log("am in deleteTask");
        // console.log("In del,req.body =",req.body);
        const { taskId } = req.body;
        if (!taskId) {
            return res.status(400).json({
                success: false,
                message: "Task Id Not found"
            });
        }
        const task = await taskModel.findByIdAndUpdate(
            taskId,
            {isDeleted: true },
            { new: true} //Return updated document
        );
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.error("error in deleteTask:",error);
    }
}

exports.editTask = async (req,res) => {
    try {
        // console.log("am in editTask");
        // console.log("req.body: ",req.body);
        const { taskId, title, description, progress,date} = req.body;
        if (!taskId) {
            return res.status(400).json({
                success: false,
                message: "Task Id Not found"
            });
        }

        const updatedTask = await taskModel.findByIdAndUpdate(
            taskId,
            {
                title,
                description,
                progress,
                date
            },
            {new: true}     //return updated document
        );

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task edit successfully",
        });
    } catch (error) {
        console.error("error in editTask:",error);
    }
}

exports.updateTaskSection = async (req,res) => {
    try {
        console.log("req.body:",req.body);
        const { taskId, newSection } = req.body;
        
        if (!taskId || !newSection) {
            return res.status(400).json({
                success: false,
                message: "Task ID and new section are required"
            });
        }

        const updateObj = { 
            section: newSection,
            ...(newSection === 'done' && { progress: 10 }) // Set progress to 10 if moving to done
        };


        const updatedTask = await taskModel.findByIdAndUpdate(
            taskId,
            updateObj,
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task section updated successfully",
            task: updatedTask
        });
    } catch (error) {
        console.error("error in updateTaskSection:",error);
    }
}