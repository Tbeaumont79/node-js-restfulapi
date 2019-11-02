const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try { 
        const token = req.headers['authorization'].split(" ")[1]
        req.token = token
        console.log(req.token)
        const result = jwt.decode(req.token, 'secret')
        if (!result) {
            res.status(401).json({
                message: "cannot verify your token ! "
            })
        }
        next()
    } catch (err){
        return res.status(401).send({
            message: "Auth failed ! " + err
        })
    }
}