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
        type: Number,
        required:true,
        index:true,
    },
    quantity:{
        type:Number,
        index:true,
    },
    category:{
        type: String,
        unique: true, 
        lowercase: true
    }
});

module.exports = mongoose.model('Product', productSchema);