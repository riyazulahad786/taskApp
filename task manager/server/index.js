const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Auth = require('./Routes/authRouters');
require('dotenv').config();
require('./Models/dataBase');
const cors = require('cors');

const PORT = process.env.PORT || 8080;

// Apply middleware
app.use(cors());
app.use(bodyParser.json()); // Middleware to parse JSON must come before your routes

// Use the auth router
app.use('/auth', Auth);

app.listen(PORT, (req, res) => {
    console.log(`Server is running at ${PORT}`);
});
