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
            res.status(201).json({ status: true, message: "New place have been added." });
        } catch (err) {
            return next(err)
        }
    },

    getPlaces: async (req, res, next) => {
        try {
            const places = await Place.find({}, '_id review rating imageUrl title country_id');
            res.status(200).json({ places })
        } catch (err) {
            return next(err);
        }
    },

    getPlace: async (req, res, next) => {
        const placeId = req.params.id;

        try {
            const place = await Place.findById(placeId, { createdAt: 0, updatedAt: 0, __v: 0 })
            .populate({
                path: 'popular',
                select: 'title rating review imageUrl location'
            });
            res.status(200).json({ place });
        } catch (err) {
            return next(err)
        }
    },

    getPlacesByCountry: async (req, res, next) => {
        const countryId = req.params.id;

        try {
            const places = await Place.find({ country_id: countryId }, { createdAt: 0, updatedAt: 0, __v: 0 })

            if (places.length === 0) {
                res.status(201).json([]);
            } else {
                res.status(200).json({ places });
            }
        } catch (err) {
            return next(err);
        }
    },

    search: async (req, res, next) => {

        try {
            const results = await Place.aggregate(
                [
                    {
                        $search: {
                            index: "places",
                            text: {
                                query: req.params.key,
                                path: {
                                    wildcard: "*"
                                }
                            }
                        }
                    }
                ]
            )

            res.status(200).json(results)
        } catch (err) {
            return next(err)
        }
    }
}