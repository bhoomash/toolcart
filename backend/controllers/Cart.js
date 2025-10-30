const Cart=require('../models/Cart')
const { asyncErrorHandler, AppError } = require('../middleware/ErrorHandler');

exports.create = asyncErrorHandler(async(req,res,next) => {
    const created = await new Cart(req.body).populate({path:"product",populate:{path:"brand"}});
    await created.save()
    res.status(201).json(created)
});

exports.getByUserId = asyncErrorHandler(async(req,res,next) => {
    const {id} = req.params
    const result = await Cart.find({ user: id }).populate({path:"product",populate:{path:"brand"}});
    res.status(200).json(result)
});

exports.updateById = asyncErrorHandler(async(req,res,next) => {
    const {id} = req.params
    const updated = await Cart.findByIdAndUpdate(id,req.body,{new:true}).populate({path:"product",populate:{path:"brand"}});
    
    if(!updated) {
        throw new AppError('Cart item not found', 404, 'CART_ITEM_NOT_FOUND');
    }
    
    res.status(200).json(updated)
});

exports.deleteById = asyncErrorHandler(async(req,res,next) => {
    const {id} = req.params
    const deleted = await Cart.findByIdAndDelete(id)
    
    if(!deleted) {
        throw new AppError('Cart item not found', 404, 'CART_ITEM_NOT_FOUND');
    }
    
    res.status(200).json(deleted)
});

exports.deleteByUserId = asyncErrorHandler(async(req,res,next) => {
    const {id} = req.params
    await Cart.deleteMany({user:id})
    res.sendStatus(204)
});