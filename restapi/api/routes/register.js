const express = require('express')
const routeur = express.Router()
const User = require('../modele/user')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

routeur.use(express.json())

routeur.post('/', (req, res, next) => {
    console.log(req.body.password)
    console.log(req.body.firstName)
    console.log(req.body.lastName)
    console.log(req.body.email)
    console.log(req.body.address)
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.status(500)
            console.log("il y a une erreur ::: ", err)
        } else {
             let user = new User({
                _id: new mongoose.Types.ObjectId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                address: req.body.address,
                password: hash,
            })
            user.save()
            .then((result) => {
                res.status(201).json({
                    message: "user succefully registered" + result
                })
                next()                
            })
            .catch((e) => console.log("there is a probleme check this out ->  ",e))
        }
    })
})
module.exports = routeur