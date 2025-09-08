const express = require("express");
const router = express.Router();
const wrapAsync= require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isloggedIn, isOwner, validateListing } = require("../middlewale.js");
const multer = require("multer");
const listingController = require("../controllers/listings.js")
const{storage}=require("../cloudConfig.js")
const upload = multer({storage})


router
 .route("/")
 .get(wrapAsync(listingController.index))
 .post(
    isloggedIn,
      validateListing,
    upload.single("listing[image]"),
  
    wrapAsync(listingController.createListing)
  );


  //New Route
router.get("/new",isloggedIn,listingController.renderNewForm)



router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isloggedIn,
    isOwner,
    validateListing,
    upload.single("listing[image]"),
    
    wrapAsync(listingController.updateListing)
  )
  .delete(isloggedIn,isOwner, wrapAsync(listingController.deleteListing));



//Edit Route
router.get("/:id/edit",isloggedIn,isOwner,wrapAsync(listingController.editListing));



module.exports = router;