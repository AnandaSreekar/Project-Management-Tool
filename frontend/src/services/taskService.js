import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

export const createTask = async (taskData) => {
    const response = await axios.post(API_URL, taskData);
    return response.data;
};

export const getTasksByProject = async (projectId) => {
    const response = await axios.get(
        `${API_URL}/project/${projectId}`
    );
    return response.data;
};

export const updateTask = async (id, taskData) => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        taskData
    );
    return response.data;
};

export const deleteTask = async (id) => {
    const response = await axios.delete(
        `${API_URL}/${id}`
    );
    return response.data;
};

// NEW

export const addComment = async (
    taskId,
    comment
) => {

    const response = await axios.post(

        `${API_URL}/${taskId}/comment`,

        comment

    );

    return response.data;

};

export const getComments = async (
    taskId
) => {

    const response = await axios.get(

        `${API_URL}/${taskId}/comments`

    );

    return response.data;

};