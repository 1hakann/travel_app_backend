const router = require("express").Router();
const userController = require("../controllers/UserController");
const {verifyToken} = require("../middleware/JwtToken");

router.get('/', verifyToken, userController.getUser);
router.delete('/',verifyToken, userController.deleteUser)

module.exports = router;