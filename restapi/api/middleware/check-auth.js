const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        console.log(req.body.token); // need to check why always null
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, "secret")
        req.userData = decoded 
        next()
    } catch (err){
        return res.status(401).json({
            message: "Auth failed ! "
        })
    }
}