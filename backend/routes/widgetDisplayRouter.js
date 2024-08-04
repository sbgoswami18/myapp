const express = require('express');
const { widgetDisplay } = require('../controllers/widgetDisplayController');
const authMiddleware = require('../middleware/auth');

const widgetDisplayRouter = express.Router();

widgetDisplayRouter.post("/", authMiddleware, widgetDisplay);

module.exports = widgetDisplayRouter;
