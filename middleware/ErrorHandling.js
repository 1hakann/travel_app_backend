const errorHandler = (req, res, next, err) => {
    return res.status(500).json({status: false, message: "Something went wrong"})
}

module.exports = errorHandler