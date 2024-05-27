const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 20
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 20
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: true, // Ensures that MongoDB will create an index on username
        minlength: 3,
        maxlength: 30 // Adjust based on your needs
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        index: true // Ensures that MongoDB will create an index on email
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String, // Changed to String to accommodate international formats and leading zeros
        required: true,
        trim: true,
        minlength: 10, // Adjust based on typical phone number lengths you expect
        maxlength: 15
    }
});

const User = mongoose.model('User', userSchema);

module.exports =  User ;
