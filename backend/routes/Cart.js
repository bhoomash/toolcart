const express=require('express')
const cartController=require('../controllers/Cart')
const { cartValidators } = require('../middleware/ValidationMiddleware')
const router=express.Router()

router
    .post("/", cartValidators.create, cartController.create)
    .get("/user/:id", cartValidators.getByUserId, cartController.getByUserId)
    .patch("/:id", cartValidators.update, cartController.updateById)
    .delete("/:id", cartValidators.delete, cartController.deleteById)
    .delete("/user/:id", cartValidators.getByUserId, cartController.deleteByUserId)

module.exports=router