const Address = require("../models/Address")
const { asyncErrorHandler, AppError } = require('../middleware/ErrorHandler');

exports.create = asyncErrorHandler(async(req,res,next) => {
    const created = new Address(req.body)
    await created.save()
    res.status(201).json(created)
});

exports.getByUserId = asyncErrorHandler(async(req,res,next) => {
    const {id} = req.params
    const results = await Address.find({user:id})
    res.status(200).json(results)
});

exports.updateById = asyncErrorHandler(async(req,res,next) => {
    const {id} = req.params
    const updated = await Address.findByIdAndUpdate(id,req.body,{new:true})
    
    if(!updated) {
        throw new AppError('Address not found', 404, 'ADDRESS_NOT_FOUND');
    }
    
    res.status(200).json(updated)
});

exports.deleteById = asyncErrorHandler(async(req,res,next) => {
    const {id} = req.params
    const deleted = await Address.findByIdAndDelete(id)
    
    if(!deleted) {
        throw new AppError('Address not found', 404, 'ADDRESS_NOT_FOUND');
    }
    
    res.status(200).json(deleted)
});


