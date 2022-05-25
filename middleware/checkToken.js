const { accessKey } = require("../config");
const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
    if (req.method === "OPTIONS") next();
    const jwtToken = req.headers.authorization?.split(" ")[1];
    if (!jwtToken) return res.status(403).json("user is not authorized");
    try {
       const userData = jwt.verify(jwtToken, accessKey);
       req.userData = userData;
        next();
    }
    catch(e) {
        console.log(e)
        return res.status(403).json('authorization error')
    }
}