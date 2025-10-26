const mongoose=require("mongoose")
const {Schema}=mongoose

const orderSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    item:{
        type:[Schema.Types.Mixed],
        required:true
    },
    address:{
        type:[Schema.Types.Mixed],
        required:true
    },
    status:{
        type:String,
        enum:['Pending','Dispatched','Out for delivery','Cancelled'],
        default:'Pending'
    },
    paymentMode:{
        type:String,
        enum:['COD','UPI','CARD','razorpay'],
        required:true
    },
    paymentStatus:{
        type:String,
        enum:['pending','paid','failed','refunded'],
        default:'pending'
    },
    paymentMethod:{
        type:String,
        enum:['razorpay','cod','upi','card'],
        default:'razorpay'
    },
    paymentId:{
        type:String
    },
    razorpayOrderId:{
        type:String
    },
    razorpaySignature:{
        type:String
    },
    paidAt:{
        type:Date
    },
    paymentError:{
        type:String
    },
    total:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
},{versionKey:false})

module.exports=mongoose.model("Order",orderSchema)