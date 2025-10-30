const express=require("express")
const userController=require("../controllers/User")
const { userValidators } = require('../middleware/ValidationMiddleware')
const router=express.Router()

router
    .get("/:id", userValidators.getById, userController.getById)
    .patch("/:id", userValidators.update, userController.updateById)

module.exports=router