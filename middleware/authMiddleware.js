const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
require('dotenv').config()

exports.protect = async (req, res, next) => {
    let token;

    try {
        // Check if Authorization header is present and starts with 'Bearer'
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            // Extract token from header
            token = req.headers.authorization.split(' ')[1];

            if (process.env.NODE_ENV !== 'production') {
                console.log("Extracted Token:", token);
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            if (!decoded.id) {
                return res.status(401).json({ message: 'Token is invalid or malformed' });
            }

            // Fetch user and attach to request object
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'User not found' });
            }

            next(); // User is authorized, proceed
        } else {
            return res.status(401).json({ message: 'Not authorized, token missing' });
        }
    } catch (error) {
        console.error("Auth middleware error:", error.message);
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};


