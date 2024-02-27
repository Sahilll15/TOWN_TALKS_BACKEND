const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(" ")[1];
        console.log(token)

        if (!token) res.status(401).send({ message: "Access denied", success: false });

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({ message: "Invalid token", success: false });
            } else {

                req.user = decoded;
                next();
            }
        })
    } catch (error) {
        res.status(500).send({ message: "Error in authentication", success: false });
        console.log(error);
    }
}