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
        quantity: req.body.quantity
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
        next();
})

routeur.delete('/:productId', (req, res, next) => {
    Product.delete({ _id: req.params.productId })
        .exec()
        .then(result => {
            console.log("product delete ! ");
            res.status(200).json({
                message:"User has been deleted !"
            })
        })
        .catch(err => {
            console.log("error when deleting an user  !")
            res.status(500).json({
                message: "probleme user not deleted ! "
            })
        })
})

module.exports = routeur;