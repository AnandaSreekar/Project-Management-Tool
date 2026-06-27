const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
{
    user: {
        type: String,
        required: true,
        trim: true
    },

    text: {
        type: String,
        required: true,
        trim: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
},
{
    _id: false
}
);

const taskSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "In Progress",
            "Completed"
        ],
        default: "Pending"
    },

    assignedTo: {
        type: String,
        trim: true
    },

    dueDate: {
        type: Date
    },

    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },

    comments: [commentSchema]

},
{
    timestamps: true
}
);

module.exports =
mongoose.model(
    "Task",
    taskSchema
);