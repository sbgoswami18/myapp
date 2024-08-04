const mongoose = require('mongoose');

const widgetDisplaySchema = new mongoose.Schema({
    primaryColor: {
        type: String,
        required: true
    },
    fontColor: {
        type: String,
        required: true
    },
    fontSize: {
        type: String,
        required: true
    },
    chatHeight: {
        type: String,
        required: true
    },
    chatIconSize: {
        type: String,
        required: true
    },
    positionOnScreen: {
        type: String,
        required: true
    },
    distanceFromBottom: {
        type: String,
        required: true
    },
    horizontalDistance: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
});

const widgetDisplayModel = mongoose.models.widgetDisplay || mongoose.model('widgetDisplay', widgetDisplaySchema);

module.exports = widgetDisplayModel;
