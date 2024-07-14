const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Property = require('../../models/property');


// Define a route for retrieving properties based on query parameters
router.get('/properties', auth, async (req, res) => {
    try {
        // Extract query parameters from the request
        const { search, country, state, city, min_price, max_price } = req.query;
        
        // Build a MongoDB query based on the query parameters
        let query = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        if (country) {
            query.country = { $regex: country, $options: 'i' };
        }
        if (state) {
            query.state = { $regex: state, $options: 'i' };
        }
        if (city) {
            query.city = { $regex: city, $options: 'i' };
        }
        if (min_price && max_price) {
            query.price = { $gte: min_price, $lte: max_price };
        } else if (min_price) {
            query.price = { $gte: min_price };
        } else if (max_price) {
            query.price = { $lte: max_price };
        }

        // Find properties that match the query
        const properties = await Property.find(query);
        
        // Send the properties as a JSON response
        res.json(properties);
    } catch (err) {
        // Log the error and send a 500 response if an error occurs
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
// End of route definition
