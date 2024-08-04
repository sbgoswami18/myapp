const express = require('express');
const { widgetGeneral } = require('../controllers/widgetGeneralController');
const authMiddleware = require('../middleware/auth');

const widgetGeneralRouter = express.Router();

widgetGeneralRouter.post("/", authMiddleware, widgetGeneral);

module.exports = widgetGeneralRouter;
