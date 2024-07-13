const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Property = require('../../models/property');


router.get('/properties', auth, async (req, res) => {
    try {
        const { search, country, state, city, min_price, max_price } = req.query;
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

        const properties = await Property.find(query);
        res.json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
