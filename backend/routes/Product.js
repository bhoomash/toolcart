const express=require('express')
const productController=require("../controllers/Product")
const { productValidators } = require('../middleware/ValidationMiddleware')
const router=express.Router()

router
    .post("/", productValidators.create, productController.create)
    .get("/", productValidators.getAll, productController.getAll)
    .get("/:id", productValidators.getById, productController.getById)
    .patch("/:id", productValidators.update, productController.updateById)
    .patch("/undelete/:id", productValidators.getById, productController.undeleteById)
    .delete("/:id", productValidators.getById, productController.deleteById)

module.exports=router