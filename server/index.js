const express = require('express');
const path = require('path'); // Require the path module
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
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Your API routes here
// Example: app.use('/api', apiRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
// Apply middleware
app.use(cors());
app.use(bodyParser.json()); // Middleware to parse JSON must come before your routes
// app.use((req, res) => {
//     res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
//   });
// app.use(express.static(path.join(__dirname, 'client/build')));

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
