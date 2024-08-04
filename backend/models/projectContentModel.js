const mongoose = require('mongoose');

const projectContentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
        required: true
    }
});

const projectContentModel = mongoose.models.projectContent || mongoose.model('projectContent', projectContentSchema);

module.exports = projectContentModel;
