const express = require('express');
const router = express.Router();
const upload = require('../../config/multer');

router.post('/', upload.single('image'), (req, res) => {
    if (req.file) {
        res.json({ url: req.file.path });
    } else {
        res.status(400).json({ msg: 'No file uploaded' });
    }
});

module.exports = router;
