const express=require('express')
const orderController=require("../controllers/Order")
const { orderValidators, commonValidators, handleValidationErrors } = require('../middleware/ValidationMiddleware')
const router=express.Router()

router
    .post("/", orderValidators.create, orderController.create)
    .get("/", orderController.getAll)
    .get("/user/:id", commonValidators.objectId('id'), handleValidationErrors, orderController.getByUserId)
    .patch("/:id", commonValidators.objectId('id'), handleValidationErrors, orderController.updateById)


module.exports=router