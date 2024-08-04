
const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate a request using a JWT token.
 * 
 * @param {Object} req - The request object.
 * @param {Object} req.headers - The headers of the request object.
 * @param {string} req.headers.token - The JWT token from the request headers.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized Login Again' });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Error" });
    }
};

module.exports = authMiddleware;
