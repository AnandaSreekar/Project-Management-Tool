import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";

import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
  updateProjectStatus
} from "../services/projectService";

function Dashboard() {

  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    if (!user) {
      navigate("/");
      return;
    }

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      setLoading(true);

      const data = await getProjects();

      setProjects(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/");

  };

  const handleAddProject = async (projectData) => {

    try {

      const newProject =
        await createProject(projectData);

      setProjects((prev) => [
        newProject,
        ...prev
      ]);

      toast.success("Project Created");

    } catch (error) {

      console.log(error);
      toast.error("Something went wrong");

    }

  };

  const handleDeleteProject = async (id) => {

    try {

      await deleteProject(id);

      setProjects((prev) =>
        prev.filter(
          (project) =>
            project._id !== id
        )
      );

      toast.success("Project Deleted");

    } catch (error) {

      console.log(error);
      toast.error("Something went wrong");

    }

  };

  const handleEditProject = async (
    id,
    projectData
  ) => {

    try {

      const updatedProject =
        await updateProject(
          id,
          projectData
        );

      setProjects((prev) =>
        prev.map((project) =>
          project._id === id
            ? updatedProject
            : project
        )
      );

      toast.success("Project Updated");

    } catch (error) {

      console.log(error);
      toast.error("Something went wrong");

    }

  };

  const handleStatusChange = async (
    id,
    status
  ) => {

    try {

      const updatedProject =
        await updateProjectStatus(
          id,
          status
        );

      setProjects((prev) =>
        prev.map((project) =>
          project._id === id
            ? updatedProject
            : project
        )
      );

      toast.success("Project Updated");

    } catch (error) {

      console.log(error);
      toast.error("Something went wrong");

    }

  };

  const filteredProjects = projects

    .filter((project) => {

      const matchesSearch =

        project.title
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        project.description
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        project.priority
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        project.status
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesFilter =

        filter === "All" ||

        project.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );

    })

    .sort((a, b) => {

      if (
        sortOrder === "Newest"
      ) {

        return (
          new Date(b.createdAt) -
          new Date(a.createdAt)
        );

      }

      return (
        new Date(a.createdAt) -
        new Date(b.createdAt)
      );

    });

  const totalProjects =
    projects.length;

  const completedProjects =
    projects.filter(
      (project) =>
        project.status === "Completed"
    ).length;

  const pendingProjects =
    totalProjects -
    completedProjects;

  const highPriorityProjects =
    projects.filter(
      (project) =>
        project.priority === "High"
    ).length;

  const completionRate =
    totalProjects === 0
      ? 0
      : Math.round(
          (completedProjects /
            totalProjects) *
            100
        );

  return (

    <div className="container">

      <div className="dashboard-header">

        <div>

          <h1>
            Welcome,
            {" "}
            {user?.name || "User"}
          </h1>

          <h2>
            Project Management Dashboard
          </h2>

        </div>

        <button
          className="delete-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      <div className="stats-container">

        <div className="stat-card total-card">

          <h3>Total Projects</h3>

          <p>{totalProjects}</p>

        </div>

        <div className="stat-card pending-card">

          <h3>Pending</h3>

          <p>{pendingProjects}</p>

        </div>

        <div className="stat-card completed-card">

          <h3>Completed</h3>

          <p>{completedProjects}</p>

        </div>

        <div className="stat-card high-card">

          <h3>High Priority</h3>

          <p>{highPriorityProjects}</p>

        </div>

        <div className="stat-card progress-card">

          <h3>Completion</h3>

          <p>{completionRate}%</p>

        </div>

      </div>

      <ProjectForm
        onAddProject={
          handleAddProject
        }
      />

      <input
        type="text"
        placeholder="Search by title, description, priority or status..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(
            e.target.value
          )
        }
      />

      <div className="filter-buttons">

        {
          [
            "All",
            "Pending",
            "Completed"
          ].map((status) => (

            <button

              key={status}

              className={
                filter === status
                  ? "active-filter"
                  : ""
              }

              onClick={() =>
                setFilter(status)
              }

            >

              {status}

            </button>

          ))
        }

      </div>

      <select

        value={sortOrder}

        onChange={(e) =>
          setSortOrder(
            e.target.value
          )
        }

      >

        <option value="Newest">

          Newest First

        </option>

        <option value="Oldest">

          Oldest First

        </option>

      </select>

      {

        loading

          ? (

              <Loader />

            )

          : (

              <ProjectList

                projects={filteredProjects}

                onDeleteProject={
                  handleDeleteProject
                }

                onStatusChange={
                  handleStatusChange
                }

                onEditProject={
                  handleEditProject
                }

              />

            )

      }

      <footer className="footer">

        <p>

          CodeAlpha Project Management Tool

        </p>

      </footer>

    </div>

  );

}

export default Dashboard;
