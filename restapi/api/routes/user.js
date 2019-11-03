const express = require('express')
const routeur = express.Router()
const User = require('../modele/user')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const alertRegister = require('../middleware/register_sound')
const checkAuth = require('../middleware/check-auth')

routeur.use(express.json())

routeur.post('/signup',alertRegister, (req, res, next) => {
    
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error:"le hash n'a pas marche !"
            })
        } else {
             let user = new User({
                _id: new mongoose.Types.ObjectId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
            })
            user.save()
            .then((result) => {
                res.status(201).json({
                    message: "user succefully registered" + result
                })
                next()                
            })
            .catch((e) => console.log(e))
        }
    })
})

routeur.post('/login', (req, res, next) => {
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

routeur.get('/all', (req, res, next) => {
    user = User.find({}, (err, result) => {
        if (err) {
            return res.status(501).json({
                message: "cannot get user, there is no data in db"
            })
        }
        else {
            res.status(200).json({
                message : "user printed : "+ result
            })
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