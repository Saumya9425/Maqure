const mongoose = require('mongoose');
const { Schema } = mongoose;

const Products = new Schema({
    name: {
        type: String,
        required:true,
    },
    Substance: {
        type: String,
    },
    CASNo: {
        type: String,
    },
    EINECS: {
        type: String,
    },
    MinPurity: {
        type: String,
    },
    Color: {
        type: String,
    },
    Apperance: {
        type: String,
    },
    Synonyms: {
        type: String,
    },
    desc: {
        type: String,
       
    },
    documents: {
        type: String,
    },    
    img:{
        type:String,
    },
    category:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'productcategory',
        required:true
    }
},{
    timestamps:true
});

module.exports = mongoose.model("product", Products);