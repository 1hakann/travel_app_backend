const User = require("../models/User")

const CryptoJS = require("crypto");
const jwt = require("jsonwebtoken");

module.exports = {
    createUser: async (req, res, next) => {
        
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString(),
        });

        try {
            await newUser.save();

            res.status(201).json({status: true, message: "User successfully created"})
        } catch(err) {
            return next(err)
        }
    }
}