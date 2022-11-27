const mongoose = require('mongoose')
const { catchaysnc } = require("../middleware/catchaysnc");
const db = require("../models/ProductCategoryModel");

// create new category

exports.createcategory = catchaysnc(async(req,res,next) =>{
    const newcategory = new db({...req.body})
    await newcategory.save();
    res.json({
        sucess:true,
        message : "category created",
        newcategory
    })
})

exports.fetchallcategory = catchaysnc(async(req,res,next) => {
    const categories = await db.find().sort({ createdAt:-1 })
    res.json({
        sucess:true,
        categories
    })
})