const widgetDisplayModel = require('../models/widgetDisplayModel');

// widgetDisplay
const widgetDisplay = async (req, res) => {
    const { primaryColor,
            fontColor,
            fontSize,
            chatHeight,
            chatIconSize,
            positionOnScreen,
            distanceFromBottom,
            horizontalDistance,
            userId 
        } = req.body;

    if (!primaryColor || !fontColor || !fontSize || !chatHeight || !chatIconSize || !positionOnScreen || !distanceFromBottom || !horizontalDistance || !userId) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        const newWidgetDisplay = new widgetDisplayModel({
            primaryColor,
            fontColor,
            fontSize,
            chatHeight,
            chatIconSize,
            positionOnScreen,
            distanceFromBottom,
            horizontalDistance,
            userId 
        });

        await newWidgetDisplay.save();
        res.status(201).json({ success: true, newWidgetDisplay });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

module.exports = {
    widgetDisplay
};