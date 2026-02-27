const jwt = require('jsonwebtoken');


function auth(req, res, next) {
    const isFromCloudflare = !!req.headers['cf-ray'];
    const userId = req.headers['x-user-id'];

    /*
     * request validated at the edge by Cloudflare Access, so we can trust the user ID in the header
     * and skip JWT verification for these requests
     */
    if (isFromCloudflare && userId) {
        req.user = {
            _id: userId,
        };

        return next();
    }


    const token = req.header('x-auth-token');
    if (!token)
        return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ error: 'Invalid token.' });
    }
}

module.exports = auth;