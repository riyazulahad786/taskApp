const User = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('../Models/task');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('7JeHOvPGefGZQJNBqblKixuzKxpK9CFc');
const googleSignup = async (req, res) => {
    const { tokenId } = req.body;
    
    try {
      const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: '7JeHOvPGefGZQJNBqblKixuzKxpK9CFc'
      });
      const payload = ticket.getPayload();
  
      // Extract user info from payload and handle registration or login
      const { email, given_name, family_name } = payload;
  
      // Check if user exists in your database and handle accordingly
      // ...
  
      res.status(200).json({ message: 'User signed up with Google successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Google sign up failed' });
    }
  };
const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        console.log(req.body);

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists", success: false });
        }

        // Create a new user instance
        const newUser = new User({ firstName, lastName, email, password });

        // Hash the password before saving
        newUser.password = await bcrypt.hash(password, 10);

        // Save the new user
        const savedUser = await newUser.save();
        console.log(savedUser,"id")
        // Respond with success and the userId
        res.status(201).json({
            message: "User registered successfully",
            success: true,
            userId: savedUser._id // Use savedUser to get the _id
        });
    } catch (error) {
        console.error('Error during user signup:', error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};
const login = async (req, res) => {
    try {
        const {email, password } = req.body;
        console.log(req.body)

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "auth failed or incorrect email or password", success: false });
        }

       const comparePassword = await bcrypt.compare(password,user.password)
       if(!comparePassword){
        return res.status(403).json({ message: "auth failed or incorrect email or password", success: false });

       }
       const jwtToken = jwt.sign(
            { email: user.email, _id: user._id }, // Payload
            process.env.JWT_SECRET_TOKEN, // Secret key from environment variables
            { expiresIn: '15m' } // Token expiry time
        );

        // Respond with success, userId, and token
        res.status(200).json({
            message: "Login successful",
            success: true,
            userId: user._id,
            _id:user._id,
            jwtToken: jwtToken // Change token to jwtToken
        });
    } catch (error) {
        console.error('Error during user login:', error); 
        res.status(500).json({ message: "Internal server error", success: false });
    }
};
const createTask = async (req,res) => {
    try {
        const {title,description,status,userId} = req.body;
        console.log(req.body)
        if(!title || !userId){
            return res.status(400).json({error:"title and userId is required"})
        }
           // Validate status value
           const validStatuses = ['todo', 'in-progress', 'done'];
           if (status && !validStatuses.includes(status)) {
               return res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}` });
           }
           // Create a new task
           const newTask = new Task({
            title,
            description,
            status,
            userId
        });
        const savedTask = await newTask.save();

        // Respond with the saved task
        res.status(201).json(savedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        console.log(req.body);

        const validStatuses = ['todo', 'in-progress', 'done'];
        if (status && !validStatuses.includes(status)) {
            console.error(`Validation error: Status must be one of: ${validStatuses.join(', ')}`);
            return res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}` });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, status },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
// const updateTask = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { title, description, status } = req.body;
//         console.log(req.body);

//         const validStatuses = ['todo', 'in-progress', 'done'];
//         if (status && !validStatuses.includes(status)) {
//             console.error(`Validation error: Status must be one of: ${validStatuses.join(', ')}`);
//             return res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}` });
//         }

//         const updatedTask = await Task.findByIdAndUpdate(
//             id,
//             { title, description, status },
//             { new: true, runValidators: true }
//         );

//         if (!updatedTask) {
//             return res.status(404).json({ error: 'Task not found' });
//         }

//         res.status(200).json(updatedTask);

//     } catch (error) {
//         console.error('Server error:', error);
//         res.status(500).json({ error: 'Server error' });
//     }
// };
// const deleteTask = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deletedTask = await Task.findByIdAndDelete(id);

//         if (!deletedTask) {
//             return res.status(404).json({ error: 'Task not found' });
//         }

//         res.status(200).json({ message: 'Task deleted successfully' });
//     } catch (error) {
//         console.error('Server error:', error);
//         res.status(500).json({ error: 'Server error' });
//     }
// };
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getTask = async (req,res) => {
    try {
        const { id } = req.params;

        // Find the task by ID
        const task = await Task.findById(id);
        console.log(task)

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Server error' });
    }
}
const getAllTasksForUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find all tasks by user ID, including deleted ones
        const tasks = await Task.find({ userId });
        if (!tasks.length) {
            return res.status(404).json({ error: 'No tasks found for this user' });
        }

        res.status(200).json(tasks);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    signup,
    login,
    createTask,
    updateTask,
    deleteTask,
    getTask,
    getAllTasksForUser,
    googleSignup
};
