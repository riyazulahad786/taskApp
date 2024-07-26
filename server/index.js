const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./Models/dataBase');

// Import routes
const Auth = require('./Routes/authRouters');
const createTaskRoutes = require('./Routes/createTaskRoutes');
const updateTaskRoutes = require('./Routes/updateTaskRoutes');
const deleteTaskRoutes = require('./Routes/deleteTaskRoutes');
const getTaskRoutes = require('./Routes/getTaskRoutes');
const getAllData = require('./Routes/getAllData');
const googleSign = require('./Routes/googleSign');

const PORT = process.env.PORT || 8080;

// Apply middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// API routes
app.use('/auth', Auth);
app.use('/api/create', createTaskRoutes);
app.use('/api/update', updateTaskRoutes);
app.use('/api/delete', deleteTaskRoutes);
app.use('/api/task', getTaskRoutes);
app.use('/api/data', getAllData);
app.use('/api/google', googleSign);

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
