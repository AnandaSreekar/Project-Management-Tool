/*Initially I used browser prompt() dialogs for editing projects. Later I replaced them with a reusable React modal component because it provides a better user experience, allows 
all fields to be edited in one place, and keeps the UI consistent while still using the same backend update API
*/
import { useEffect, useState } from "react";

function EditProjectModal({
  isOpen,
  project,
  onClose,
  onSave
}) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {

    if (project) {

      setTitle(project.title || "");

      setDescription(project.description || "");

      setPriority(project.priority || "Medium");

      setStatus(project.status || "Pending");

      setDueDate(
        project.dueDate
          ? project.dueDate.slice(0, 10)
          : ""
      );

    }

  }, [project]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {

    e.preventDefault();

    onSave(project._id, {
      title,
      description,
      priority,
      status,
      dueDate
    });

    onClose();

  };

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>Edit Project</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
          />

          <textarea
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />

          <select
            value={priority}
            onChange={(e)=>setPriority(e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select
            value={status}
            onChange={(e)=>setStatus(e.target.value)}
          >
            <option>Pending</option>
            <option>Completed</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e)=>setDueDate(e.target.value)}
          />

          <div className="modal-buttons">

            <button
              type="button"
              className="delete-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="edit-btn"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default EditProjectModal;
