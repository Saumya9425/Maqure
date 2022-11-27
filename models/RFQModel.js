const mongoose = require('mongoose');


const RFQModel = mongoose.Schema({
   buyer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'buyer',
      required:true  
   },     
   product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'product',
      required:true
   },  
   quantity: {
      type: Number,
      required:true
   },
   buyer_pincode:{
     type:Number,
     required:true
   },
   remark: {
      type: String,
      default:'No remarks'
   }, 
   bids: [{
      seller: {
         type: mongoose.SchemaTypes.ObjectId,
         ref: 'seller'
      },
      price: {
         type: Number,
         default:null
      },
   }
   ],
   quote_documents: [
      { type: String, }
   ],
   timer: {
      type:Date
   },
   buyer_Price:{
      type:Number,
      default:000
   },
   negotiation:{
      type:Boolean,
      default:false
   },
   quote_status: {
      type: String,
      Enum: ['Processing','Active','Pending','Rejected'],
      default:'Processing'
   },
   order_status: {
      type: String,
      default: null
   },
   query: {
      type: String
   },
   reject_reason:{
      type:String
   },
},{
   timestamps:true
});



module.exports = mongoose.model('order',RFQModel)