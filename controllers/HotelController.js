const Hotel = require("../models/Hotel");

module.exports = {
    addHotel: async (req, res, next) => {
        const {
            country_id,
            title,
            description,
            availability,
            contact,
            imageUrl,
            rating,
            review,
            location,
            coordinates,
            price,
            facilities,
        } = req.body;
        
        try {
            const newHotel = new Hotel({
                country_id,
                title,
                description,
                availability,
                contact,
                imageUrl,
                rating,
                review,
                location,
                coordinates,
                price,
                facilities,
            });

            await newHotel.save();
            res.status(201).json({status: true, message: "Hotel was added."})

        } catch(err) {
            return next(err)
        }
    },

    getHotelsByCountry: async (req, res, next) => {
        const countryId = req.params.id;

        try {
            const hotel = await Hotel.find({country_id: countryId});
            
            if(hotel.length === 0){
                return res.status(200).json([]);
            }

            res.status(200).json(hotel)
        } catch (error) {
            return next(error) 
         }
    },

    getHotelById: async (req, res, next) => {
        const hotelId = req.params.id;

        try {
            const hotel = await Hotel.findById(hotelId)
            .populate({
                path: 'reviews',
                options: { sort: {updatedAt: -1}, limit: 2 },
                select: 'rating review updatedAt user',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'username profile'
                }
            });

            if(!hotel) {
                res.status(404).json({status: false, message: "Hotel not found"});
            }
    
            res.status(200).json({status: true});
        } catch(err) {
            return next(err);
        }
    } 
}