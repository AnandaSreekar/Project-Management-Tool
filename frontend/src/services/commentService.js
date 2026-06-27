import axios from "axios";

const API_URL = "http://localhost:5000/api/comments";

// Create Comment
export const createComment = async (commentData) => {

    const response = await axios.post(
        API_URL,
        commentData
    );

    return response.data;

};

// Get Comments for a Task
export const getCommentsByTask = async (taskId) => {

    const response = await axios.get(
        `${API_URL}/task/${taskId}`
    );

    return response.data;

};

// Update Comment
export const updateComment = async (
    id,
    commentData
) => {

    const response = await axios.put(
        `${API_URL}/${id}`,
        commentData
    );

    return response.data;

};

// Delete Comment
export const deleteComment = async (id) => {

    const response = await axios.delete(
        `${API_URL}/${id}`
    );

    return response.data;

};