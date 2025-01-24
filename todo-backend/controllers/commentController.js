const mongoose = require('mongoose');
const commentModel = require('../models/commentsSchema');

exports.addComment = async (req,res) => {
    try {
        const {taskId, text} = req.body;

        const comment = await commentModel.create({
            taskId: new mongoose.Types.ObjectId(taskId),
            text: text,
            date: new Date()
        })

        res.status(200).json({
            success: true, 
            message: "Comment added successfully" 
        });
    } catch (error) {
        console.error("error in addComment:",error);
    }
}

exports.getComment = async (req,res) => {
    try {
        console.log("am in getComment");
        const { taskId } = req.params;
        console.log(taskId);

        const comments = await commentModel.find({
            taskId: new mongoose.Types.ObjectId(taskId)
        });

        console.log("comments: ",comments);

        if (!comments || comments.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No comments found for this task",
                comments: []
            });
        }

        res.status(200).json({
            success: true, 
            message: "Comments fetched successfully",
            allComment: comments
        });

    } catch (error) {
        console.error("error in getComment:",error);
    }
}