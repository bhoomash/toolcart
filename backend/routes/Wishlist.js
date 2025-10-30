const express=require("express")
const wishlistController=require("../controllers/Wishlist")
const { body } = require('express-validator')
const { commonValidators, handleValidationErrors } = require('../middleware/ValidationMiddleware')
const router=express.Router()

// Wishlist validation rules
const wishlistValidators = {
    create: [
        body('user')
            .custom(value => {
                const mongoose = require('mongoose');
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error('Valid user ID is required');
                }
                return true;
            }),
        body('product')
            .custom(value => {
                const mongoose = require('mongoose');
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error('Valid product ID is required');
                }
                return true;
            }),
        handleValidationErrors
    ]
};

router
    .post("/", wishlistValidators.create, wishlistController.create)
    .get("/user/:id", commonValidators.objectId('id'), handleValidationErrors, wishlistController.getByUserId)
    .patch("/:id", commonValidators.objectId('id'), handleValidationErrors, wishlistController.updateById)
    .delete("/:id", commonValidators.objectId('id'), handleValidationErrors, wishlistController.deleteById)

module.exports=router