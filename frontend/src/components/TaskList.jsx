import { useState } from "react";
import EditTaskModal from "./EditTaskModal";
import DeleteModal from "./DeleteModal";
import CommentSection from "./CommentSection";
function TaskList({
    tasks,
    onDeleteTask,
    onEditTask,
    onStatusChange
}) {

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <h3>No Tasks Found</h3>
                <p>Create your first task.</p>
            </div>
        );
    }

    return (
        <>
            <div className="task-list">

                {tasks.map((task) => (

                    <div
                        className="task-card"
                        key={task._id}
                    >

                        <h3>{task.title}</h3>

                        <p>{task.description}</p>

                        <p>
                            <strong>Assigned To:</strong>{" "}
                            {task.assignedTo || "Not Assigned"}
                        </p>

                        <p>
                            <strong>Due Date:</strong>{" "}
                            {
                                task.dueDate
                                    ? new Date(task.dueDate).toLocaleDateString()
                                    : "Not Set"
                            }
                        </p>

                        <p>
                            <strong>Priority:</strong>{" "}
                            <span className={`${task.priority?.toLowerCase()}-priority`}>
                                {task.priority || "Medium"}
                            </span>
                        </p>

                        <p
                            className={
                                task.status === "Completed"
                                    ? "completed"
                                    : "pending"
                            }
                        >
                            <strong>Status:</strong> {task.status}
                        </p>

                        <div className="action-buttons">

                            {
                                task.status !== "Completed" && (

                                    <button
                                        className="complete-btn"
                                        onClick={() =>
                                            onStatusChange(
                                                task._id,
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

                                    setSelectedTask(task);

                                    setIsEditOpen(true);

                                }}
                            >
                                ✏ Edit
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => {

                                    setTaskToDelete(task);

                                    setShowDeleteModal(true);

                                }}
                            >
                                🗑 Delete
                            </button>

                        </div>
                                <CommentSection
                    taskId={task._id}
/>
                    </div>

                ))}

            </div>

            <EditTaskModal

                isOpen={isEditOpen}

                task={selectedTask}

                onClose={() => {

                    setIsEditOpen(false);

                    setSelectedTask(null);

                }}

                onSave={onEditTask}

            />

            <DeleteModal

                isOpen={showDeleteModal}

                title="Delete Task"

                message={`Delete "${taskToDelete?.title}" ?`}

                onCancel={() => {

                    setShowDeleteModal(false);

                    setTaskToDelete(null);

                }}

                onConfirm={() => {

                    onDeleteTask(taskToDelete._id);

                    setShowDeleteModal(false);

                    setTaskToDelete(null);

                }}

            />

        </>
    );

}

export default TaskList;