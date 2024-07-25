const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Auth = require('./Routes/authRouters');
const createTaskRoutes = require('./Routes/authRouters');
const updateTaskRoutes = require('./Routes/authRouters');
const deleteTaskRoutes = require('./Routes/authRouters');
const getTaskRoutes = require('./Routes/authRouters');
const getAllData = require('./Routes/authRouters');
const googleSign = require('./Routes/authRouters')
require('dotenv').config();
require('./Models/dataBase');
const cors = require('cors');

const PORT = process.env.PORT || 8080;

// Apply middleware
app.use(cors());
app.use(bodyParser.json()); // Middleware to parse JSON must come before your routes
app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
  
// Use the auth router
app.use('/auth', Auth);
app.use('/api', createTaskRoutes);
app.use('/api',updateTaskRoutes);
app.use('/api',deleteTaskRoutes);
app.use('/api',getTaskRoutes);
app.use('/api',getAllData);
app.use('/api',googleSign);


app.listen(PORT, (req, res) => {
    console.log(`Server is running at ${PORT}`);
});
