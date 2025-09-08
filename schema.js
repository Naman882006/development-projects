const joi=require("joi");
module.exports.listing = require('./models/listing');
const { _descriptors } = require('chart.js/helpers');
const review = require('./models/review');
const Joi = require("joi");
const { image } = require("framer-motion/client");

module.exports.listingSchema = Joi.object({
    listing : joi.object({
        title:joi.string().required(),
        description: joi.string().required(),
        location:joi.string().required(),
        country:joi.string().required(),
        price:joi.number().required().min(0),
        image: joi.object({
            filename: joi.string().allow("",null),
            url:joi.string().allow("",null),
        }).optional(),


    }).required()
})

module.exports.reviewSchema= joi.object({
    review:joi.object({
        rating:joi.number().required().min(1).max(5),
        comment:joi.string().required(),
    }).required(),
})

