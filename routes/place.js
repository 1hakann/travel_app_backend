const router = require("express").Router();
const placeController = require("../controllers/PlaceController");
const {verifyToken} = require("../middleware/JwtToken");

router.post('/', verifyToken, placeController.addPlace);
router.get('/', placeController.getPlaces);
router.get('/:id', placeController.getPlace);
router.get('/byCountry/:id', placeController.getPlacesByCountry);
router.get('/search/:key', placeController.search);
// router.get('/recommendations', placeController.getRecommendation);

module.exports = router;