const express = require('express')
const routeur = express.Router()
const User = require('../modele/user')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const checkAuth = require('../middleware/check-auth')

routeur.use(express.json())

routeur.get('/all', (req, res, next) => {
    user = User.find({}, (err, result) => {
        if (err) {
            return res.status(501).json({
                message: "cannot get user, there is no data in db"
            })
        }
        else {
            res.send(result)
            next()
        }
    })
})

//envoyer un mail a l'utlisateur pour lui signaler qu'il est ban
routeur.put('/:userId', checkAuth, (req, res, next) => {
    const revoke = {
        access: req.body.revoke
    }
    User.updateOne({_id: req.params.userId }, revoke, (err) => {
        if (err) {
            res.status(400).json({
                message: "there is an error " + err
            })
        } else {
            res.status(200).json({
                message: "user succefully ban ! "
            })
            next();
        }
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