const express = require('express');
const { createbuyer, getbuyers, getsinglebuyer, loginbuyer, logoutbuyer, Updatebuyer, deletebuyer, getallBuyerBids ,accpetquote, autologin,sendotp,verifyotp } = require('../controller/BuyerController');
const { isAutharization, autherizesrole, isAdmin, isOurUser } = require('../middleware/auth');


const app = express.Router()


const newbuyer =  app.post('/new/buyer' , createbuyer)
const GetBuyers =  app.get('/buyers' , isAutharization , autherizesrole('admin') ,getbuyers)
const GetSingleBuyer =  app.get('/buyer/:id' ,isAutharization, autherizesrole('buyer','admin') , getsinglebuyer)
const LoginBuyer =  app.post('/login/buyer' , loginbuyer)
const LogoutBuyer = app.get('/logout/buyer',logoutbuyer)
const UpdateBuyer = app.put('/update/buyer/:id',isAutharization, autherizesrole('buyer','admin') ,Updatebuyer)
const DeleteBuyer =  app.delete('/buyer/:id', isAutharization ,autherizesrole('admin'),deletebuyer)
const GetBuyerBids = app.get('/getall/buyer/bids', isAutharization, autherizesrole('buyer','admin') , getallBuyerBids )
const Accpetquote = app.put("/buyer/accpetquote/:id", isAutharization, autherizesrole('buyer', 'admin'), accpetquote)
const AutoLogin = app.get('/auto/login', isOurUser , autologin)
const newsignup = app.post('/send/otp',sendotp)
const Verifyotp = app.post('/verify/otp',verifyotp)





module.exports = {Verifyotp,newsignup,newbuyer , GetBuyers , GetSingleBuyer , LoginBuyer , LogoutBuyer , UpdateBuyer , DeleteBuyer , GetBuyerBids , Accpetquote,AutoLogin}