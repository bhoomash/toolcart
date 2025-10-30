const Review=require("../models/Review")
const { asyncErrorHandler, AppError } = require('../middleware/ErrorHandler');

exports.create = asyncErrorHandler(async(req,res,next) => {
    const created = await new Review(req.body).populate({path:'user',select:"-password"})
    await created.save()
    res.status(201).json(created)
});

exports.getByProductId = asyncErrorHandler(async(req,res,next) => {
    const {id} = req.params
    let skip=0
    let limit=0

    if(req.query.page && req.query.limit){
        const pageSize=req.query.limit
        const page=req.query.page

        skip=pageSize*(page-1)
        limit=pageSize
    }

    const totalDocs=await Review.find({product:id}).countDocuments().exec()
    const result=await Review.find({product:id}).skip(skip).limit(limit).populate('user').exec()

    res.set("X-total-Count",totalDocs)
    res.status(200).json(result)
});

exports.updateById = asyncErrorHandler(async(req,res,next) => {
    const {id} = req.params
    const updated = await Review.findByIdAndUpdate(id,req.body,{new:true}).populate('user')
    
    if(!updated) {
        throw new AppError('Review not found', 404, 'REVIEW_NOT_FOUND');
    }
    
    res.status(200).json(updated)
});

exports.deleteById = asyncErrorHandler(async(req,res,next) => {
    const {id} = req.params
    const deleted = await Review.findByIdAndDelete(id)
    
    if(!deleted) {
        throw new AppError('Review not found', 404, 'REVIEW_NOT_FOUND');
    }
    
    res.status(200).json(deleted)
});