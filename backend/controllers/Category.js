const Category=require("../models/Category")
const { asyncErrorHandler, AppError } = require('../middleware/ErrorHandler');

exports.getAll = asyncErrorHandler(async(req,res,next) => {
    const result = await Category.find({})
    res.status(200).json(result)
});