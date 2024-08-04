const widgetGeneralModel = require('../models/widgetGeneralModel');

// widgetGeneral
const widgetGeneral = async (req, res) => {
    const {chatbotName, welcomeMessage, inputPlaceholder, userId } = req.body;

    if (!chatbotName || !welcomeMessage || !inputPlaceholder || !userId) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        const newWidgetGeneral = new widgetGeneralModel({
            chatbotName,
            welcomeMessage,
            inputPlaceholder,
            userId
        });

        await newWidgetGeneral.save();
        res.status(201).json({ success: true, newWidgetGeneral });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

module.exports = {
    widgetGeneral
};