
const Listing = require("../models/listing");


module.exports.index =async(req,res)=>{
const alllistings = await Listing.find({});
res.render("listings/index.ejs",{alllistings});
}

module.exports.renderNewForm=(req,res)=>{   
    res.render("listings/new.ejs");
}

module.exports.showListing= async (req,res)=>{
    let {id}=req.params;
const listing = await Listing.findById(id)
.populate({path:"reviews",
    populate:{
        path:"author"
    },
})
.populate("owner");
if (!listing) {
     req.flash("error","listing you requested for does not exist!");
     return res.redirect("/listings");
}
// console.log(listing)
res.render("listings/show.ejs",{listing})
}

module.exports.createListing = async (req, res) => {
    try {
        const { location } = req.body.listing;

        // Geocoding
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
        const data = await response.json();

        const place = data.find(item => item.addresstype === "city") || data[0];
        if (!place) {
            req.flash("error", "Location not found!");
            return res.redirect("/listings/new");
        }

        const geometry = {
            type: "Point",
            coordinates: [parseFloat(place.lon), parseFloat(place.lat)],
        };

        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;

        if (req.file) {
            newListing.image = { url: req.file.path, filename: req.file.filename };
        }
        newListing.geometry = geometry;

        const saveListing = await newListing.save();
        console.log(saveListing);

        req.flash("success", "New Listing Created!");
        // ✅ Traditional redirect to /listings
        res.redirect("/listings");
    } catch (err) {
        console.error(err);
        req.flash("error", "Something went wrong!");
        res.redirect("/listings/new");
    }
};



module.exports.editListing=async(req,res)=>{
    
 let {id}=req.params;
const listing = await Listing.findById(id);
if (!listing) {
     req.flash("error","listing you requested for does not exist!");
     return res.redirect("/listings");
}

let originalImageUrl = listing.image.url;
originalImageUrl= originalImageUrl.replace("/upload","/upload/w_250")
    res.render("listings/edit.ejs",{listing,originalImageUrl});
}


module.exports.updateListing = async (req,res)=>{
 
    let {id}=req.params;

     
let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing},{ new: true, runValidators: true });

if (typeof req.file !== "undefined") {
 
     let url = req.file.path;
   let filename = req.file.filename;
   listing.image ={url,filename};
   await listing.save();   
}
     req.flash("success","Listing Updated!");


res.redirect(`/listings/${id}`)
};

module.exports.deleteListing = async (req,res)=>{
    let {id}=req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
     req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}