const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    members: [
        {
            type: String,
            trim: true
        }
    ],

    status: {
        type: String,
        enum: [
            "Pending",
            "Completed"
        ],
        default: "Pending"
    },

    priority: {
        type: String,
        enum: [
            "High",
            "Medium",
            "Low"
        ],
        default: "Medium"
    },

    dueDate: {
        type: Date
    }

},
{
    timestamps: true
}
);

module.exports =
mongoose.model(
    "Project",
    projectSchema
);