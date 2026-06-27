import { useState } from "react";
import { toast } from "react-toastify";

import DeleteModal from "./DeleteModal";
import EditProjectModal from "./EditProjectModal";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

import {
    createTask,
    deleteTask,
    getTasksByProject,
    updateTask
} from "../services/taskService";

function ProjectList({
    projects,
    onDeleteProject,
    onEditProject,
    onStatusChange
}) {

    const [activeProjectId, setActiveProjectId] = useState(null);
    const [tasksByProject, setTasksByProject] = useState({});
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    const loadTasks = async (projectId) => {
        const tasks = await getTasksByProject(projectId);

        setTasksByProject((prev) => ({
            ...prev,
            [projectId]: tasks
        }));
    };

    const handleToggleTasks = async (projectId) => {
        if (activeProjectId === projectId) {
            setActiveProjectId(null);
            return;
        }

        setActiveProjectId(projectId);
        await loadTasks(projectId);
    };

    const handleAddTask = async (taskData) => {
        try {
            const newTask = await createTask(taskData);

            setTasksByProject((prev) => ({
                ...prev,
                [taskData.projectId]: [
                    newTask,
                    ...(prev[taskData.projectId] || [])
                ]
            }));

            toast.success("Task Added");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const handleDeleteTask = async (projectId, taskId) => {
        try {
            await deleteTask(taskId);

            setTasksByProject((prev) => ({
                ...prev,
                [projectId]: (prev[projectId] || []).filter(
                    (task) => task._id !== taskId
                )
            }));

            toast.success("Task Deleted");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const handleEditTask = async (projectId, taskId, taskData) => {
        try {
            const updatedTask = await updateTask(taskId, taskData);

            setTasksByProject((prev) => ({
                ...prev,
                [projectId]: (prev[projectId] || []).map((task) =>
                    task._id === taskId ? updatedTask : task
                )
            }));
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const handleTaskStatusChange = async (projectId, taskId, status) => {
        await handleEditTask(projectId, taskId, { status });
    };

    if (projects.length === 0) {
        return (
            <div className="empty-state">
                <h3>No Projects Found</h3>
                <p>Create your first project.</p>
            </div>
        );
    }

    return (
        <div className="project-list">
            {projects.map((project) => {
                const totalTasks =
                    tasksByProject[project._id]?.length || 0;

                const completedTasks =
                    tasksByProject[project._id]?.filter(
                        (task) => task.status === "Completed"
                    ).length || 0;

                const progress =
                    totalTasks === 0
                        ? 0
                        : Math.round(
                            (completedTasks / totalTasks) * 100
                        );

                return (
                    <div
                        className="project-card"
                        key={project._id}
                    >
                    <div className="project-header">
    <div>
        <h3>{project.title}</h3>

        <p className="project-description">
            {project.description || "No description provided"}
        </p>
    </div>

    <span
        className={`status-badge ${
            project.status === "Completed"
                ? "completed-badge"
                : "pending-badge"
        }`}
    >
        {project.status}
    </span>
</div>

                    <div className="project-details">

    <p>
        📌 <strong>Priority:</strong>

        <span
            className={`${project.priority?.toLowerCase()}-priority`}
        >
            {" "}
            {project.priority || "Medium"}
        </span>
    </p>

    <p>
        📅 <strong>Due:</strong>{" "}
        {
            project.dueDate
                ? new Date(project.dueDate).toLocaleDateString()
                : "Not Set"
        }
    </p>

    <p>
        <strong>👥 Members:</strong>{" "}
        {
            project.members?.length > 0
                ? project.members.join(", ")
                : "No Members"
        }
    </p>

    <div className="progress-section">
        <p>
            <strong>Progress</strong>
        </p>

        <div className="progress-bar">
            <div
                className="progress-fill"
                style={{
                    width: `${progress}%`
                }}
            ></div>
        </div>

        <p>
            {completedTasks} / {totalTasks} Tasks Completed ({progress}%)
        </p>
    </div>

</div>

                    <div className="action-buttons">
                        {
                            project.status !== "Completed" && (
                                <button
                                    className="complete-btn"
                                    onClick={() =>
                                        onStatusChange(
                                            project._id,
                                            "Completed"
                                        )
                                    }
                                >
                                    ✔ Complete
                                </button>
                            )
                        }

                        <button
                            className="edit-btn"
                            onClick={() => {
                                setSelectedProject(project);
                                setIsEditOpen(true);
                            }}
                        >
                          ✏ Edit
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() => {
                                setProjectToDelete(project);
                                setShowDeleteModal(true);
                            }}
                        >
                           🗑 Delete 
                        </button>
                    </div>

                    <button
                        className="manage-task-btn"
                        onClick={() =>
                            handleToggleTasks(project._id)
                        }
                    >
                        {
                            activeProjectId === project._id
                                ? "▲ Hide Tasks"
                                : "📋 Manage Tasks"
                        }
                    </button>

                    {
                        activeProjectId === project._id && (
                            <div className="task-section">
                                <TaskForm
                                    projectId={project._id}
                                    onAddTask={handleAddTask}
                                />

                                <TaskList
                                    tasks={tasksByProject[project._id] || []}
                                    onDeleteTask={(taskId) =>
                                        handleDeleteTask(
                                            project._id,
                                            taskId
                                        )
                                    }
                                    onEditTask={(taskId, taskData) =>
                                        handleEditTask(
                                            project._id,
                                            taskId,
                                            taskData
                                        )
                                    }
                                    onStatusChange={(taskId, status) =>
                                        handleTaskStatusChange(
                                            project._id,
                                            taskId,
                                            status
                                        )
                                    }
                                />
                            </div>
                        )
                    }
                    </div>
                );
            })}
            <EditProjectModal
                isOpen={isEditOpen}
                project={selectedProject}
                onClose={() => {
                    setIsEditOpen(false);
                    setSelectedProject(null);
                }}
                onSave={onEditProject}
            />
            <DeleteModal
                isOpen={showDeleteModal}
                title="Delete Project"
                message={`Delete "${projectToDelete?.title}" ?`}
                onCancel={() => {
                    setShowDeleteModal(false);
                }}
                onConfirm={() => {
                    onDeleteProject(projectToDelete._id);
                    setShowDeleteModal(false);
                }}
            />
        </div>
    );
}

export default ProjectList;
