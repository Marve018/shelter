const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/user');
const Property = require('../../models/property');
const checkRole = require('../../middleware/role');

// Get all properties of logged-in user
router.get('/user_properties', [auth, checkRole(['admin'])], async (req, res) => {
    try {
        const properties = await Property.find({ owner: req.user.id });
        res.json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update user's profile
router.put('/profile', auth, [
    check('username', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, firstName, lastName, role } = req.body;

        try {
            let user = await User.findById(req.user.id);

            if (!user) {
                return res.status(400).json({ msg: "User not found" });
            }

            user.username = username;
            user.email = email;
            user.firstName = firstName;
            user.lastName = lastName;
            if (role) {
                user.role = role;
            }
            user.updatedAt = Date.now();

            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

// Delete user's account
router.delete('/user', [auth, checkRole(['admin'])], async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        await Property.deleteMany({ owner: req.user.id });
        await User.findByIdAndRemove(req.user.id);

        res.json({ msg: "User and properties deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
