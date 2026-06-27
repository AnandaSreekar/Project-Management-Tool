import { useState } from "react";
import { toast } from "react-toastify";

function TaskForm({ projectId, onAddTask }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("Medium");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!title.trim()) {
            toast.error("Task title is required");
            return;
        }

        await onAddTask({
            title,
            description,
            assignedTo,
            dueDate,
            priority,
            projectId
        });

        setTitle("");
        setDescription("");
        setAssignedTo("");
        setDueDate("");
        setPriority("Medium");
    };

    return (
        <form
            className="task-form"
            onSubmit={handleSubmit}
        >

            <h3>Create Task</h3>

            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
                required
            />

            <textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
            />

            <input
                type="text"
                placeholder="Assigned To"
                value={assignedTo}
                onChange={(e) =>
                    setAssignedTo(e.target.value)
                }
            />

            <input
                type="date"
                value={dueDate}
                onChange={(e) =>
                    setDueDate(e.target.value)
                }
            />

            <select
                value={priority}
                onChange={(e) =>
                    setPriority(e.target.value)
                }
            >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
            </select>

            <button type="submit">
                Add Task
            </button>

        </form>
    );
}

export default TaskForm;
