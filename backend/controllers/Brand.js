const Brand=require("../models/Brand")
const { asyncErrorHandler, AppError } = require('../middleware/ErrorHandler');

exports.getAll = asyncErrorHandler(async(req,res,next) => {
    const result = await Brand.find({})
    res.status(200).json(result)
});