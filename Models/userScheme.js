const mongoose = require('mongoose')


//  structure/scheme for users
const userSchema = new  mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    acno:{
        type:Number,
        required:true,
        unique:true
    },
    balance:{
        type:Number,
        required:true
    },
    transactions:{
        type:Array,
        required:true
    }
}) 

// collection to store doc.. in schema

  const users = mongoose.model("users",userSchema)
module.exports= users
// export model to controller
