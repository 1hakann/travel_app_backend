const Place = require("../models/Place");

module.exports = {
    addPlace: async (req, res, next) => {
        const { country_id, description, imageUrl, location, title, rating, review, latitude, longitude, contact_id } = req.body;

        try {
            const newPlace = new Place({
                country_id,
                description,
                imageUrl,
                location,
                contact_id,
                title,
                rating,
                review,
                latitude,
                longitude
            });

            await newPlace.save();
            res.status(201).json({status: true, message: "New place have been added."});
        } catch(err) {
            return next(err)
        }
    } 
}