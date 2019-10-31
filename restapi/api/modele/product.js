const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    price:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    quantity:{
        type:Number,
        required:true,
        index:true,
    },
});

module.exports = mongoose.model('Product', productSchema);