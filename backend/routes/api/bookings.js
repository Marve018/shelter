const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/user');
const Property = require('../../models/property');
const Booking = require('../../models/booking');

// book a property
router.post('/property/:id', [auth, checkRole(['user'])], [
    check('startDate', 'Start date is required').isISO8601(),
    check('endDate', 'End date is required').isISO8601()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { startDate, endDate } = req.body;
    const propertyId = req.params.id;

    try {
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ msg: 'Property not found' });
        }
        const overlappingBooking = await Booking.findOne({
            property: propertyId,
            $or: [
                { $and: [{ startDate: { $lte: startDate } }, { endDate: { $gte: startDate } }] },
                { $and: [{ startDate: { $lte: endDate } }, { endDate: { $gte: endDate } }] },
                { $and: [{ startDate: { $gte: startDate } }, { endDate: { $lte: endDate } }] }
            ],
            status: 'booked'
        });
        if (overlappingBooking) {
            return res.status(400).json({ msg: 'Property is already booked' });
        }
        const booking = new Booking({
            owner: req.user.id,
            property: propertyId,
            startDate,
            endDate
        });
        await booking.save();
        res.json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// define route to get user's booking history
router.get('/history', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ owner: req.user.id }).populate('property', ['title', 'address']);
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// cancelled a booking
router.put('/cancel/:id', auth, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }
        if (booking.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        booking.status = 'cancelled';
        await booking.save();
        res.json({ msg: 'Booking cancelled' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
