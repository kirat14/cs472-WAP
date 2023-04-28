const User = require('../models/user')

exports.login = (req, res, next) => {
    try {
        const { username, password } = req.body;
        const accessToken = {accessToken: User.login(username, password)};
        
        res.status(200).json(accessToken);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

