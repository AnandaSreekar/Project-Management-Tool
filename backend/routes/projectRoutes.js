const express = require("express");

const router = express.Router();

const {
  createProject,
  getProjects,
  deleteProject,
  updateProject,
  updateProjectStatus
} = require("../controllers/projectController");

router.post("/", createProject);

router.get("/", getProjects);

router.put("/:id/status", updateProjectStatus);

router.put("/:id", updateProject);

router.delete("/:id", deleteProject);

module.exports = router;