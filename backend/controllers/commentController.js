const Comment = require("../models/Comment");

// Create Comment
const createComment = async (req, res) => {
  try {

    const comment = await Comment.create(req.body);

    res.status(201).json(comment);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Get Comments for a Task
const getCommentsByTask = async (req, res) => {
  try {

    const comments = await Comment.find({
      taskId: req.params.taskId
    }).sort({
      createdAt: -1
    });

    res.status(200).json(comments);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Update Comment
const updateComment = async (req, res) => {
  try {

    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }

    res.status(200).json(comment);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Delete Comment
const deleteComment = async (req, res) => {
  try {

    const comment = await Comment.findByIdAndDelete(
      req.params.id
    );

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }

    res.status(200).json({
      message: "Comment deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  createComment,
  getCommentsByTask,
  updateComment,
  deleteComment
};