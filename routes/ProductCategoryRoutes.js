const express = require('express');
const {createcategory,fetchallcategory} = require('../controller/ProductCategoryController')
const { isAutharization, isAdmin, isSeller, autherizesrole } = require('../middleware/auth');


const app = express.Router()

const CreateProductCategory = app.post('/new/category', isAutharization ,autherizesrole('admin') , createcategory)
const GetAllCategory = app.get('/category',fetchallcategory)

module.exports = {CreateProductCategory,GetAllCategory}