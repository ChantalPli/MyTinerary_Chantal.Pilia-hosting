const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    password: [{ type: String, required: true }],
    emailVerified: { type: Boolean, required: true },
    picture: { type: String, required: true },
    country: { type: String, required: true },
    from: { type: Array },
    uniqueString: { type: String, required: true },

})

const User = mongoose.model('User', userSchema, 'User');

module.exports = User;