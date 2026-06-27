import { useEffect, useState } from "react";
import {
  createComment,
  getCommentsByTask,
  deleteComment
} from "../services/commentService";

import { toast } from "react-toastify";

function CommentSection({ taskId }) {

  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
  if (taskId) {
    loadComments();
  }
}, [taskId]);

  const loadComments = async () => {

    try {

      const data =
        await getCommentsByTask(taskId);

      setComments(data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleAddComment = async () => {

    if (!message.trim()) {

      toast.error("Enter a comment");

      return;

    }

    try {

      const user =
        JSON.parse(localStorage.getItem("user"));

      const newComment =
        await createComment({

          message,

          taskId,

          userName:
            user?.name || "Anonymous"

        });

      setComments([
        newComment,
        ...comments
      ]);

      setMessage("");

      toast.success("Comment Added");

    } catch (error) {

      toast.error("Unable to add comment");

    }

  };

  const handleDelete = async (id) => {

    try {

      await deleteComment(id);

      setComments(

        comments.filter(

          (comment) =>
            comment._id !== id

        )

      );

      toast.success("Comment Deleted");

    } catch (error) {

      toast.error("Delete Failed");

    }

  };

  return (

    <div className="comment-section">

      <h4>Comments</h4>

      <div className="comment-input">

        <input

          type="text"

          placeholder="Write a comment..."

          value={message}

          onChange={(e)=>
            setMessage(e.target.value)
          }

        />

        <button
          onClick={handleAddComment}
        >
          Add
        </button>

      </div>

      {

        comments.map((comment)=>(

          <div
            className="comment-card"
            key={comment._id}
          >

            <strong>

              {comment.userName}

            </strong>

            <p>

              {comment.message}

            </p>

            <small>

              {
                new Date(
                  comment.createdAt
                ).toLocaleString()
              }

            </small>

            <br />

            <button

              className="delete-btn"

              onClick={()=>
                handleDelete(comment._id)
              }

            >
              Delete
            </button>

          </div>

        ))

      }

    </div>

  );

}

export default CommentSection;