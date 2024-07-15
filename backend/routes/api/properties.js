const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Property = require('../../models/property');
const User = require('../../models/user');
const Booking = require('../../models/booking');

// Define a route for creating a new property
router.post('/property', [auth, checkRole(['admin'])], [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('country', 'Country is required').not().isEmpty(),
    check('state', 'State is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty(),
    check('imageUrl', 'Image URL is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, price, address, country, state, city, imageUrl } = req.body;

    try {
        const newProperty = new Property({
            title,
            description,
            price,
            address,
            country,
            state,
            city,
            imageUrl,
            owner: req.user.id
        });

        const property = await newProperty.save();
        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// define route to get all properties
router.get('/all_properties', async (req, res) => {
    try {
        const properties = await Property.find().populate('owner', ['name', 'email']);
        res.json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Define a route for retrieving a property by ID
router.get('/property/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('owner', ['name', 'email']);
        if (!property) {
            return res.status(404).json({ msg: 'Property not found' });
        }
        res.json(property);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Property not found' });
        }
        res.status(500).send('Server Error');
    }
});

// Define a route for deleting a property by ID
router.delete('/property/:id', [auth, checkRole(['admin'])], async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ msg: 'Property not found' });
        }
        if (property.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await property.remove();
        res.json({ msg: 'Property removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Property not found' });
        }
        res.status(500).send('Server Error');
    }
});

// Define a route for updating a property by ID
router.put('/property/:id', [auth, checkRole(['admin'])], async (req, res) => {
    const { title, description, price, address, country, state, city, imageUrl } = req.body;

    // Create a new property object
    const propertyFields = {};
    if (title) propertyFields.title = title;
    if (description) propertyFields.description = description;
    if (price) propertyFields.price = price;
    if (address) propertyFields.address = address;
    if (country) propertyFields.country = country;
    if (state) propertyFields.state = state;
    if (city) propertyFields.city = city;
    if (imageUrl) propertyFields.imageUrl = imageUrl;

    try {
        let property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ msg: 'Property not found' });
        }
        if (property.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        property = await Property.findByIdAndUpdate(
            req.params.id, { $set: propertyFields }, { new: true });

        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

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

// get all bookings for owner properties
router.get('/bookings', [auth, checkRole(['admin'])], async (req, res) => {
    try {
        const bookings = await Booking.find({ owner: req.user.id }).populate('property', ['title', 'address']);
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
// End of route definition
