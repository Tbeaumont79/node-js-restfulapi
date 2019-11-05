const mongoose = require('mongoose')

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    address: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true,
    },
    access: {
        type: Number,
        default: 1
    }
}); 

//Export the model
module.exports = mongoose.model('User', userSchema);