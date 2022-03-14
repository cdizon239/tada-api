const mongoose = require('../db/connection')

const UserSchema = new mongoose.Schema({
    givenName: {
        type: String,
        require: true
    },
    googleId: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    imageUrl: {
        type: String
    }
})

//  instantiate model
const User = mongoose.model('User', UserSchema);

module.exports = User;