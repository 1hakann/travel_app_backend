const User = require("../models/User")

const CryptoJS = require("crypto-js");
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
    },

    loginUser: async (res, req, next) => {
        try {
            const user = await User.findOne({email: req.body.email})

            if(!user) {
                return res.status(401).json({status: false, message: "User not found"});
            }

            const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
            const decryptString = decryptedPassword.toString(CryptoJS.enc.Utf8);

            if(decryptString !== req.body.password) {
                return res.status(401).json({status: false, message: "Wrong password"});
            }

            const userToken = jwt.sign(
                {
                    id: user.id,
                },
                process.env.JWT_SECRET, {expiresIn: "21d"}
            );

            const user_id = user.id;

            res.status(200).json({status: true, id: user_id, token: userToken})

        } catch(err) {
            return next(err)
        }
    }

}