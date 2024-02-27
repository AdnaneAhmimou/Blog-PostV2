const session = require('express-session');
const authMiddleware = (req, res, next) => {
    if (req.session.user) {
        // User is authenticated, proceed to next middleware
        next();
    } else {
        // User is not authenticated, send unauthorized response
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authMiddleware;