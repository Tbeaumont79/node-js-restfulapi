const mongoose = require('mongoose')
const Product = require('../modele/product')
const express = require('express')
const checkAuth = require('../middleware/check-auth')
const routeur = express.Router()

routeur.use(express.json())
routeur.post('/add', checkAuth, (req, res, next) => {
    let products = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category
    })
    
    products.save()
        .then((result) => {
    
        if (result) {
            console.log("the product is added ! ", result)
        return (res.status(200))
        }
    })
    .catch(err => { 
        console.log("je catch !! ", err)
        return (res.status(400))
    })
    res.status(200).json({
        message: "product succefully added ",
    })
    next();
})

routeur.put('/:productId', (req, res, next) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category
    }
    User.updateOne({_id: req.params.productId }, newProduct, (err) => {
        if (err) {
            res.status(400).json({
                message: "there is an error " + err
            })
        } else {
            res.status(200).json({
                message: "product sucefully change ! "
            })
            next();
        }
    })
})

routeur.get('/all', (req,res,next) => {
    Product.find({}, (err, result) => {
        if (err) {
            res.status(400).json({
                message: "cannot get products"
            })
        }
        if (result) {
            res.status(200).json({
                message: "all products : " + result
            })
            next()
        }
    })
})

routeur.delete('/:productId', (req, res, next) => {
    Product.delete({ _id: req.params.productId })
        .exec()
        .then(result => {
            console.log("product delete ! ");
            res.status(200).json({
                message:"User has been deleted !" + result
            })
            next()
        })
        .catch(err => {
            console.log("error when deleting an user  !")
            res.status(500).json({
                message: "probleme user not deleted ! " + err
            })
        })
})

module.exports = routeur;