const express = require('express')
const app = express()
const port = 3000
const user = require('./api/routes/user')
const product = require('./api/routes/product')
const mongoose = require('mongoose')
const signup = require('./api/routes/register')
const login = require('./api/routes/login')

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.

mongoose.connect('mongodb://127.0.0.1:27017/test');

//testing connectivity
mongoose.connection.once('connected', function() {
	console.log("Database connected successfully")
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
    next()   
})

app.use('/signup', signup)
app.use('/login', login)
app.use('/products', product)
app.use('/user', user)

app.get('/', (req, res) => res.send('/login to login /signup to signup'))
app.listen(port, () => console.log('Example app listening on port 3000!'))
