import axios from "axios";

const API_URL = "http://localhost:5000/api/projects";

const getUserId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.id;
};

export const getProjects = async () => {

    const response = await axios.get(API_URL, {
        params: {
            userId: getUserId()
        }
    });

    return response.data;
};

export const createProject = async (projectData) => {

    const response = await axios.post(
        API_URL,
        {
            ...projectData,
            userId: getUserId()
        }
    );

    return response.data;
};

export const deleteProject = async (id) => {

    const response = await axios.delete(
        `${API_URL}/${id}`
    );

    return response.data;
};

export const updateProject = async (
    id,
    projectData
) => {

    const response = await axios.put(
        `${API_URL}/${id}`,
        projectData
    );

    return response.data;
};

export const updateProjectStatus = async (
    id,
    status
) => {

    const response = await axios.put(
        `${API_URL}/${id}/status`,
        {
            status
        }
    );

    return response.data;
};