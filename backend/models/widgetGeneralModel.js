const mongoose = require('mongoose');

const widgetGeneralSchema = new mongoose.Schema({
    chatbotName: {
        type: String,
        required: true
    },
    welcomeMessage: {
        type: String,
        required: true
    },
    inputPlaceholder: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
});

const widgetGeneralModel = mongoose.models.widgetGeneral || mongoose.model('widgetGeneral', widgetGeneralSchema);

module.exports = widgetGeneralModel;
