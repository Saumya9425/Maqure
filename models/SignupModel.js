const mongoose = require('mongoose')

const Signup = mongoose.Schema({
    mobile_number:{
        type:String,
        required:true,
        
    },
    otp:{
        type:Number,
    },
    verified:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("signup",Signup);