const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    progress: {
        type: Number,
        required: [true, 'Progress is required'],
        min: 0,
        max: 10
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    section: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    // comments: [{
    //     text: String,
    //     date: { type: Date, default: Date.now },
    //     // userId: String
    // }],
})

const taskModel = mongoose.model('task',taskSchema);
module.exports = taskModel;