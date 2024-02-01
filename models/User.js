const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    profile: {type: String, default: "/assets/images/profile.png"},
})

module.exports = mongoose.model("User", UserSchema);