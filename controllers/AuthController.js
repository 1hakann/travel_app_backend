const User = require("../models/User")

const CryptoJS = require("crypto");
const jwt = require("jsonwebtoken");

module.exports = {
    createUser: async (req, res, next) => {
        
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, )
        })
    }
}