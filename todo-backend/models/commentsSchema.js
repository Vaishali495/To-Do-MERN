const mongoose = require("mongoose");
const taskModel = require("./taskSchema");

const commentSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task',
        required: [true, 'Task ID is required']
    },
    text: {
        type: String,
        required: [true, 'Comment text is required'],
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const commentModel = mongoose.model('comment',commentSchema);
module.exports = commentModel;