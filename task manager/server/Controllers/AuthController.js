const User = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        console.log(req.body)

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists", success: false });
        }

        const newUser = new User({ firstName, lastName, email, password });

        newUser.password = await bcrypt.hash(password, 10);

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", success: true });
    } catch (error) {
        console.error('Error during user signup:', error); // Log the error
        res.status(500).json({ message: "Internal server error", success: false });
    }
};
const login = async (req, res) => {
    try {
        const {email, password } = req.body;
        console.log(req.body)

        // Check if the user already exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "auth failed or incorrect email or password", success: false });
        }

       const comparePassword = await bcrypt.compare(password,user.password)
       if(!comparePassword){
        return res.status(403).json({ message: "auth failed or incorrect email or password", success: false });

       }
       const jwtToken = jwt.sign({email:User.email, _id : User._id},process.env.JWT_SECRET_TOKEN,{expiresIn:'15m'})
          
        // Send success response
        res.status(201).json({ message: "User login successfully", success: true ,jwtToken,email,});
    } catch (error) {
        console.error('Error during user login:', error); // Log the error
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = {
    signup,
    login
};
