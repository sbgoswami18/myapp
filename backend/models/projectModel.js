const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
});

const projectModel = mongoose.models.project || mongoose.model('project', projectSchema);

module.exports = projectModel;
