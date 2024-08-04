const express = require('express');
const { createProject, getProjects, getProject } = require('../controllers/projectController');
const authMiddleware = require("../middleware/auth");

const projectRouter = express.Router();

projectRouter.post("/createProject", authMiddleware, createProject);
projectRouter.get("/getProjects", authMiddleware, getProjects);
projectRouter.get("/getProject/:id", authMiddleware, getProject);

module.exports = projectRouter;
