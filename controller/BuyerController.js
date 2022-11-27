
const { catchaysnc } = require("../middleware/catchaysnc");
const db = require("../models/BuyerModel");
const Errorhandler = require("../utils/errorhandler");
const sendtoken = require("../utils/jwttoken");
// const { generateOtp } = require("../utils/sendOTP")
const OrderModel = require("../models/RFQModel");
const signup = require("../models/SignupModel")


exports.createbuyer = catchaysnc(async (req, res, next) => {
  const buyer = new db({ ...req.body })
  await buyer.save()
  sendtoken(buyer, 200, res)
})

// getbuyer list
exports.getbuyers = catchaysnc(async (req, res, next) => {
  const buyers = await db.find()
  res.json({
    sucess: true,
    buyers
  })

})

// getsingle buyer
exports.getsinglebuyer = catchaysnc(async (req, res, next) => {
  const id = req.params.id

  const buyer = await db.findById(id).populate("bids").populate([
    {
      path: 'bids',
      populate: [{ path: 'product' }],

    }
  ])

  if (!buyer) {
    return next("user not found", 404)
  }

  res.status(200).json({
    success: true,
    buyer
  })
})


// login buyer
exports.loginbuyer = catchaysnc(async (req, res, next) => {
  const { email, password } = req.body
  // check email or password is enterde or not
  if (!email || !password) {
    return next(new Errorhandler('please enter email or paswwrod', 401))
  }
  //find user
  const user = await db.findOne({ email }).select("+password")
  //if user not found send error message
  if (!user) {
    return next(new Errorhandler('user not found : Invalid email or password', 404))
  }
  //check the passwrod is correct or not
  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    return next(new Errorhandler('Invalid Email or Password'), 404)
  }
  //create token and store it in cookie

  sendtoken(user, 200, res);
})


// logout 
exports.logoutbuyer = catchaysnc(async (req, res, next) => {
  res.cookie(
    'token',
    null,
    {
      httpOnly: true,
      expires: new Date(Date.now())
    }
  )
  res.json({
    success: true,
    message: "successfully logged out the user "
  })
})

//sendotp
exports.sendotp = async(req,res,next) => {
  try{
  const mobileNumber = req.body.number;
  var otp = Math.floor(1000 + Math.random() * 9000);
  const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  client.messages
  .create({
     body: `Your otp is ${otp}`,
     from: '+19519442547',
     to: mobileNumber
   })
  const newsignup = new signup({number:mobileNumber,otp:otp})
  await newsignup.save();
  res.status(200).send(newsignup)
  }
  catch(e)
  {
    res.status(400).send(e)
  }
}

//verify otp
exports.verifyotp = async(req,res,next) => {
  try{
  const {number,otp} = req.body;
  const user = await signup.findOne({number:number,otp:otp})
  if(!user)
  res.status(400).send('Wrong otp')
  else
  {
    user.verified = true;
    res.status(200).send(user)
  }
}
catch(e){
  res.status(400).send(e);
}
}

// forgot password



// reset password


// update Buyer profile
exports.Updatebuyer = catchaysnc(async (req, res, next) => {
  const { id } = req.params
  const user = await db.findByIdAndUpdate(id, { ...req.body }, { new: true })
  if (!user) {
    return next(new Errorhandler('user not Found', 404))
  }
  await user.save({ validateBeforeSave: false })

  res.status(200).json({
    success: true,
    message: "profile updated successfully",
    user
  })

})


// delete buyer
exports.deletebuyer = catchaysnc(async (req, res, next) => {
  const buyer = await db.findByIdAndRemove(req.params.id);
  if (!buyer) {
    return next(new Errorhandler("Not Found", 404))
  }
  res.json({
    success: true,
    message: "deleted successfully",
    buyer
  })
})


exports.getallBuyerBids = catchaysnc(async (req, res, next) => {
  console.log(req.user.id)
  const buyerbids = await db.findById(req.user.id, { bids: 1 }).populate('bids').populate([
    {
      path: 'bids',
      populate: [{ path: 'product' }],

    }
  ])
  if (!buyerbids) {
    return next(new Errorhandler('something went wrong please try to login', 404))
  }

  res.status(200).json({
    success: true,
    buyerbids
  })

})


// hiren

// buyer click accept bid
exports.accpetquote = catchaysnc(async (req, res, next) => {
  const orderid = req.params.id;

  const data = await OrderModel.findByIdAndUpdate(
    orderid,
    { quote_status: "accepted" },
    { new: true }
  );
  if (!data) {
    return next(new Errorhandler('order is not find', 404))
  }
  await data.save();
  res.status(200).json({
    sucess: true,
    data,
  });
})


// common route for auto login
exports.autologin = catchaysnc(async (req, res, next) => {
  const user = req.user
  res.status(200).json({
    success: true,
    user
  })
})