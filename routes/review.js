const router = require("express").Router();
const reviewController = require("../controllers/ReviewController");
const {verifyToken} = require("../middleware/JwtToken");

router.post("/", verifyToken, reviewController.addReview);
router.get('/:id', reviewController.getReviews);

module.exports = router;