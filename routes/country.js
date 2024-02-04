const router = require("express").Router();
const countryController = require("../controllers/CountryControllers");
const {verifyToken} = require("../middleware/JwtToken");

router.get('/', countryController.getCountries);
router.post('/', verifyToken, countryController.addCountry);
router.get('/:id', countryController.getCountry);

module.exports = router;