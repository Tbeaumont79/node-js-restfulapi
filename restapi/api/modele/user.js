const mongoose = require('mongoose')

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    password:{
        type:String,
        required:true,
        index:true,
    },
    orderAdress: {
        type: String,
        required: true,
        index: true,
    },
    access: {
        type: Number,
        default: 1
    }
}); 

//Export the model
module.exports = mongoose.model('User', userSchema);