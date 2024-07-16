const jwt = require('jsonwebtoken');
const config = require('config');


// This module exports a middleware function that checks for a JWT token in the
// request header and verifies its authenticity. If the token is present and
// valid, it sets the decoded user object in the request and passes control
// to the next middleware function. If the token is missing or invalid, it
// returns a 401 Unauthorized response.

// The middleware function takes three parameters: the request object, the
// response object, and the next middleware function.

module.exports = function(req, res, next){
    // Get the token from the request header.
    const token = req.header('x-auth-token');

    // If no token is present, return a 401 Unauthorized response.
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify the token using the secret key from the environment variable.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Set the decoded user object in the request.
        req.user = decoded.user;

        // Pass control to the next middleware function.
        next();
    } catch (err) {
        // If the token is invalid, return a 401 Unauthorized response.
        res.status(401).json({ msg: 'Token is not valid'});
    }
};
