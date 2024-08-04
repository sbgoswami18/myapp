const projectContentModel = require("../models/projectContentModel");

// create projectContent
const createProjectContent = async (req, res) => {
    const { name, description, projectId } = req.body;

    if (!name || !description || !projectId) {
        return res.status(400).json({ success: false, message: 'Name, description, and project ID are required.' });
    }

    try {
        const newProjectContent = new projectContentModel({
            name,
            description,
            projectId
        });

        await newProjectContent.save();

        res.status(201).json({ success: true, projectContent: newProjectContent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

// edit projectContent
const editProjectContent = async (req, res) => {
    const { projectContentId, description } = req.body;

    if (!projectContentId || !description) {
        return res.status(400).json({ success: false, message: 'ProjectContent ID and description are required.' });
    }

    try {
        // Find the project content by ID and update it
        const updatedProjectContent = await projectContentModel.findByIdAndUpdate(
            projectContentId,
            { description },
            { new: true }
        );

        if (!updatedProjectContent) {
            return res.status(404).json({ success: false, message: 'Project content not found.' });
        }

        res.status(200).json({ success: true, projectContent: updatedProjectContent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

// delete projectContent
const deleteProjectContent = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: 'ProjectContent ID is required.' });
    }

    try {
        // Find the project content by ID and delete it
        const deletedProjectContent = await projectContentModel.findByIdAndDelete({_id:id});

        if (!deletedProjectContent) {
            return res.status(404).json({ success: false, message: 'Project content not found.' });
        }

        res.status(200).json({ success: true, message: 'Project content deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

// get AllProjectContent
const getAllProjectContent = async (req, res) => {
    const { id } = req.params; // Get the project ID from the request parameters
    try {
        // Find all project content where projectId matches the provided id
        const allProjectContent = await projectContentModel.find({ projectId: id });

        res.status(200).json({ success: true, allProjectContent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

// get ProjectContent
const getProjectContent = async (req, res) => {
    const { id } = req.params; // Get the project ID from the request parameters
    try {
        const projectContent = await projectContentModel.findById({_id:id});

        res.status(200).json({ success: true, projectContent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

module.exports = {
    createProjectContent,
    editProjectContent,
    deleteProjectContent,
    getAllProjectContent,
    getProjectContent
};