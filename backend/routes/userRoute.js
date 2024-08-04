const express = require('express');
const { loginUser, registerUser, userData, userDataUpdate } = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/userData", authMiddleware, userData);
userRouter.put("/userDataUpdate", authMiddleware, userDataUpdate);

module.exports = userRouter;
