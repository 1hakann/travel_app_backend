const router = require("express").Router();
const hotelController = require("../controllers/HotelController");
const {verifyToken} = require("../middleware/JwtToken");

router.post('/', verifyToken, hotelController.addHotel);
router.get('/:id', hotelController.getHotelById);
router.get('/byCountry/:id', hotelController.getHotelsByCountry);

module.exports = router;