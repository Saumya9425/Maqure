const mongoose = require('mongoose')

const CategoryModel = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    icon:{
        type:String,
    }
},{
    timestamps:true,
})

module.exports = mongoose.model('productcategory',CategoryModel)