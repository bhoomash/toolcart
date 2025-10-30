const express=require('express')
const addressController=require("../controllers/Address")
const { addressValidators, commonValidators, handleValidationErrors } = require('../middleware/ValidationMiddleware')
const router=express.Router()

router
    .post("/", addressValidators.create, addressController.create)
    .get("/user/:id", commonValidators.objectId('id'), handleValidationErrors, addressController.getByUserId)
    .patch('/:id', addressValidators.update, addressController.updateById)
    .delete('/:id', commonValidators.objectId('id'), handleValidationErrors, addressController.deleteById)

module.exports=router