const Wishlist = require("../models/Wishlist")
const { asyncErrorHandler, AppError } = require('../middleware/ErrorHandler');

exports.create = asyncErrorHandler(async(req,res,next) => {
    const created = await new Wishlist(req.body).populate({path:"product",populate:["brand"]})
    await created.save()
    res.status(201).json(created)
});

exports.getByUserId = asyncErrorHandler(async(req,res,next) => {
    const {id} = req.params
    let skip=0
    let limit=0

    if(req.query.page && req.query.limit){
        const pageSize=req.query.limit
        const page=req.query.page

        skip=pageSize*(page-1)
        limit=pageSize
    }

    const result=await Wishlist.find({user:id}).skip(skip).limit(limit).populate({path:"product",populate:['brand']})
    const totalResults=await Wishlist.find({user:id}).countDocuments().exec()

    res.set("X-Total-Count",totalResults)
    res.status(200).json(result)
});

exports.updateById = asyncErrorHandler(async(req,res,next) => {
    const {id} = req.params
    const updated = await Wishlist.findByIdAndUpdate(id,req.body,{new:true}).populate("product")
    
    if(!updated) {
        throw new AppError('Wishlist item not found', 404, 'WISHLIST_ITEM_NOT_FOUND');
    }
    
    res.status(200).json(updated)
});

exports.deleteById = asyncErrorHandler(async(req,res,next) => {
    const {id} = req.params
    const deleted = await Wishlist.findByIdAndDelete(id)
    
    if(!deleted) {
        throw new AppError('Wishlist item not found', 404, 'WISHLIST_ITEM_NOT_FOUND');
    }
    
    return res.status(200).json(deleted)
});