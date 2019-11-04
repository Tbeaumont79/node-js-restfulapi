const express = require('express')
const app = express()
const port = 3000
const user = require('./api/routes/user')
const product = require('./api/routes/product')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;


// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://192.168.1.23:27017/Ecom', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
    next()   
})

app.use('/products', product)
app.use('/user', user)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log('Example app listening on port 3000!'))