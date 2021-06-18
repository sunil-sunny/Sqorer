const jwt = require('jsonwebtoken');
const config = require('config');
const User = require("../../models/user");

const auth = async (req, res, next) => {
    try {

        const token = req.header('Auth').replace('Bearer', '');
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new error()
        } else {
            req.token = token
            req.user = user
            next()
        }

    } catch (e) {
        res.status(401).send({
            msg: 'Invalid credentials'
        })
    }
}


module.exports = auth
