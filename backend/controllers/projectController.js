const Project = require("../models/Project");

const createProject = async (req, res) => {
    try {
       //this  below line going to take al the data from frontend wt user going to enter and create a mongodb document from it 
        const project = await Project.create(req.body);//req.body means wt the user going to enter in the frontend form and send it to backend and then backend going to take that data and create a document from it in mongodb......

        res.status(201).json(project);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();

        res.status(200).json(projects);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteProject = async (req, res) => {
    try {
      const deletedProject =
    await Project.findByIdAndDelete(req.params.id);

if (!deletedProject) {
    return res.status(404).json({
        message: "Project not found"
    });
}

res.status(200).json({
    message: "Project deleted successfully"
});
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const updateProject = async (req, res) => {
  try {

  const updatedProject =
await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
        new: true,
        runValidators: true
    }
);

if (!updatedProject) {
    return res.status(404).json({
        message: "Project not found"
    });
}

res.status(200).json(updatedProject);

    res.status(200).json(updatedProject);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
const updateProjectStatus = async (req, res) => {
    try {

        const project =
await Project.findByIdAndUpdate(
    req.params.id,
    {
        status: req.body.status
    },
    {
        new: true,
        runValidators: true
    }
);

if (!project) {
    return res.status(404).json({
        message: "Project not found"
    });
}

res.status(200).json(project);
    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};
module.exports = {
  createProject,
  getProjects,
  deleteProject,
  updateProject,
  updateProjectStatus
};
