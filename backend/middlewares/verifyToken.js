const jwt = require('jsonwebtoken');
const Account = require('../models/Account');

// Function to get all channels
const { JWT_SECRET } = process.env;

const verifyToken = async (req, res, next) => {
    try {
        // get token from header
        const token = req.headers.authorization.split(' ')[1];

        // decode the token
        const decodedToken = jwt.verify(token, JWT_SECRET);

        // get the account ID from the decoded token
        const accountId = decodedToken.account_id;

        const account = await Account.findOne({
            where: {
                id: accountId
            }
        });

        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        // pass the account instance to the controller
        req.account = account;

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;
