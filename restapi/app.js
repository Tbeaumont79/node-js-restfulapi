const express = require('express')
const app = express()
const port = 3000
const user = require('./api/routes/user')
const product = require('./api/routes/product')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;


// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/Ecom', {
    useNewUrlParser: true,
    useCreateIndex: true,
}, (err) => {
    if (!err) {
        res.status(200).json({
            message: "database connected " + result
        })
    } else {
        res.status(401).json({
            message: "database not connected" + err
        })
    }
});
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
    next()   
})

// products/add to add a product
app.use('/products', product)
// user/login to login
// user/signup to signup
app.use('/user', user)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log('Example app listening on port 3000!'))