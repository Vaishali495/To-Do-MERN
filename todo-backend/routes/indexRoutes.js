const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController.js');
const commentRoutes = require('./commentRoutes');

router.get("/getAllTasks",indexController.getAllTasks);

router.post("/addTaskInTodo",indexController.AddTaskInTodo);
router.post("/addTaskInProgress",indexController.AddTaskInProgress);
router.post("/addTaskInDone",indexController.AddTaskInDone)

router.delete("/deleteTask",indexController.deleteTask);
router.put("/editTask",indexController.editTask);

router.put("/updateTaskSection",indexController.updateTaskSection);

//Comment routes
router.use("/comment", commentRoutes);

module.exports = router;