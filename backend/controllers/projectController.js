const projectModel = require('../models/projectModel');

// create project
const createProject = async (req, res) => {
    const { name, userId } = req.body;

    if (!name) {
        return res.status(400).json({ success: false, message: 'Project name is required.' });
    }

    try {
        const newProject = new projectModel({
            name,
            userId
        });

        await newProject.save();
        res.status(201).json({ success: true, project: newProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

// get projects
const getProjects = async (req, res) => {
    try {
        const allProjects = await projectModel.find({userId: req.body.userId});

        res.status(200).json({ success: true, projects: allProjects });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

// get project
const getProject = async (req, res) => {
    const {id} = req.params;
    try {
        const project = await projectModel.findById({_id:id});

        res.status(200).json({ success: true, project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
}

module.exports = {
    createProject,
    getProjects,
    getProject
};