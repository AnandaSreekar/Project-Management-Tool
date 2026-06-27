import { useState } from "react";
import { toast } from "react-toastify";

function ProjectForm({ onAddProject }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [members, setMembers] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!title.trim()) {
            toast.error("Project title is required.");
            return;
        }

        const membersArray = members
            .split(",")
            .map((member) => member.trim())
            .filter((member) => member !== "");

        onAddProject({

            title: title.trim(),

            description: description.trim(),

            members: membersArray,

            priority,

            dueDate

        });

        setTitle("");
        setDescription("");
        setMembers("");
        setPriority("Medium");
        setDueDate("");

        toast.success("Project Created Successfully");

    };

    return (

        <form
            className="project-form"
            onSubmit={handleSubmit}
        >

            <h2>Create New Project</h2>

            <input
                type="text"
                placeholder="Project Title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                required
            />

            <textarea
                placeholder="Project Description"
                rows="4"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
            />

            <input
                type="text"
                placeholder="Team Members (Rahul, Sai, Anil)"
                value={members}
                onChange={(e)=>setMembers(e.target.value)}
            />

            <select
                value={priority}
                onChange={(e)=>setPriority(e.target.value)}
            >
                <option value="High">🔴 High</option>
                <option value="Medium">🟠 Medium</option>
                <option value="Low">🟢 Low</option>
            </select>

            <label htmlFor="dueDate">
                📅 Project Deadline
            </label>

            <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e)=>setDueDate(e.target.value)}
            />

            <button type="submit">
                ➕ Add Project
            </button>

        </form>

    );

}

export default ProjectForm;
