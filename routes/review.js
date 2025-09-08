const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync= require("../utils/wrapAsync.js");
const {validateReview, isOwner, isloggedIn, isReviewAuthor }= require("../middlewale.js")
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

const reviewController = require("../controllers/review.js")



//Reviews Post Route
router.post("/",isloggedIn,validateReview ,wrapAsync(reviewController.createReview))

//Review Delete Route
router.delete("/:reviewId",isloggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview))


module.exports =router;