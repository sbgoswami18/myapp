// import express from 'express'
const express = require('express');
const cors = require("cors");
const connectDB = require("./config/db.js")
const userRouter = require("./routes/userRoute.js")
const projectRouter = require("./routes/projectRoute.js")
const dotenv = require('dotenv');
const projectContentRouter = require('./routes/projectContentRoute.js');
const widgetGeneralRouter = require('./routes/widgetGeneralRoute.js');
const widgetDisplayRouter = require('./routes/widgetDisplayRouter.js');
dotenv.config();
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const path = require('path');


// app config
const app = express()

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.use(cors());

const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
)

// cloudinary connection
cloudinaryConnect();

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/project", projectRouter)
app.use("/api/projectContent", projectContentRouter)
app.use("/api/widgetGeneral", widgetGeneralRouter)
app.use("/api/widgetDisplay", widgetDisplayRouter)

app.get('/', (req, res) => {
    res.send('API Working...')
})
// Start the server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})