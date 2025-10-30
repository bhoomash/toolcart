const express=require('express')
const reviewController=require("../controllers/Review")
const { reviewValidators, commonValidators, handleValidationErrors } = require('../middleware/ValidationMiddleware')
const router=express.Router()

router
    .post("/", reviewValidators.create, reviewController.create)
    .get('/product/:id', commonValidators.objectId('id'), handleValidationErrors, reviewController.getByProductId)
    .patch('/:id', reviewValidators.update, reviewController.updateById)
    .delete("/:id", commonValidators.objectId('id'), handleValidationErrors, reviewController.deleteById)

module.exports=router