const express = require('express')
const routeur = express.Router()
const User = require('../modele/user')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

routeur.use(express.json())


routeur.post('/', (req, res, next) => {
    User.find({email: req.body.email}, (err, user) => {
        if (err) {
            res.status(400).json({
                message: "there is an error and welcome " + err
            })
        } else {
            if (user.length < 1) {
                res.status(401).json({
                    message:"auth failed"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err || user[0].access == 0) {
                    res.status(401).json({
                        message:"auth failed"
                    })
                } else if (result){
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    'secret',
                    {
                        expiresIn: "1h",
                    });
                    res.status(200).json({
                        message:"auth success",
                        token: token
                    })
                    next()
                }
            })
        }
    })
})

module.exports = routeur
