const User = require("../models/User")

module.exports = {
    getUser: async (req, res, next) => {
        const user_id = req.user.id;

        try {
            const user = await User.findById({_id: user_id}, {password: 0, __v: 0, createdAt: 0, updatedAt: 0});

            if(!user) {
                return res.status(401).json({status: false, message: "User does not exist"})
            }

            res.status(200).json(user)
        } catch(err) {
            return next(err);
        }
    },

    deleteUser: async (req, res, next) => {
        const user_id = req.user.id;

        try {
            const user = await User.findByIdAndDelete(user_id);

            res.status(200).json({status: true, message: "User succesfully deleted"});
        } catch(err) {
            return next(err);
        }
    }
}