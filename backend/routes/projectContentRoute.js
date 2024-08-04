const express = require('express');
const { createProjectContent, editProjectContent, deleteProjectContent, getAllProjectContent, getProjectContent } = require('../controllers/projectContentController');
const authMiddleware = require("../middleware/auth");

const projectContentRouter = express.Router();

projectContentRouter.post("/createProjectContent", authMiddleware, createProjectContent);
projectContentRouter.put("/editProjectContent", authMiddleware, editProjectContent);
projectContentRouter.delete("/deleteProjectContent/:id", authMiddleware, deleteProjectContent);
projectContentRouter.get("/getAllProjectContent/:id", authMiddleware, getAllProjectContent);
projectContentRouter.get("/getProjectContent/:id", authMiddleware, getProjectContent);

module.exports = projectContentRouter;
