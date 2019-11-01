const express = require('express')
const routeur = express.Router()
const User = require('../modele/user')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

routeur.use(express.json())

routeur.post('/signup', (req, res, next) => {
    
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error:"le hash n'a pas marche !"
            })
        } else {
             let user = new User({
                _id: new mongoose.Types.ObjectId,
                name: req.body.name,
                email: req.body.email,
                password: hash
            })
            user.save()
            .then((result) => res.status(200).json({
                message:"succesfully registered  " + result
            }))
            .catch((err) => {res.status(401).json({
                message: "voila l'erreur " + err
            })})
        }
    })
    next()
})

routeur.post('/login', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length < 1) {
            res.status(401).json({
                message:"auth failed"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
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
            }
        })
    })
})

routeur.delete("/:userId", (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(res => {
            res.status(200).json({
                message: 'User delete !'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
})

module.exports = routeur