const User = require('../model/user-schema');

const userSignUp = async (req, res) => {
    try {
        const user = req.body;

        // Basic Validation
        if (!user.username || !user.email || !user.password) {
            return res.status(400).json({ message: 'Please provide username, email, and password.' });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists with the given email.' });
        }

        // Create new user directly with received data
        const newUser = new User(user);
        await newUser.save();

        newUser.password = '';
        res.status(201).json({ message: 'User created successfully', user: newUser });


    } catch (error) {
        console.log("userSignup");
        console.log(`Error while user signup: ${error}`);
        res.status(500).json({ message: error.message });
    }
};

const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Basic Validation
        if (!username || !password) {
            return res.status(400).json({ message: 'Please provide username and password.' });
        }

        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check password
        if (password !== existingUser.password) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        // Password is valid, prepare user data for response
        existingUser.password = '';

        // Return successful signin response
        res.status(200).json({ message: 'User signed in successfully', user: existingUser });
    } catch (error) {
        console.error(`Error while user signin: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { userSignUp, userLogin };
