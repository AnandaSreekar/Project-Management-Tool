const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true
    },

    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true
    },

    userName: {
      type: String,
      default: "Anonymous"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Comment",
  commentSchema
);