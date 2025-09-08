const mongoose = require("mongoose");
const Review = require("./review.js");

const Schema = mongoose.Schema;


const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image:{
        url:String,
        filename:String,
    },
    // image: {
    //     filename: {
    //         type: String,
    //         default: "listingimage"
    //     },
    //     url: {
    //         type: String,
    //         default: "https://cdn.pixabay.com/photo/2023/09/15/16/52/flower-8255103_960_720.png"
    //     }
    // },
    price: Number,
    location: String,
    country: String,
    reviews:[
       {
        type: Schema.Types.ObjectId, 
        ref:"Review",
       }
    ],
    owner:{
        type :Schema.Types.ObjectId,
        ref :"User",
    },
    geometry:{
        type:{
        type:String,
        enum:["Point"],
        required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }

    }
});


listingSchema.post("findOneAndDelete",async(listing)=>{
    if (listing) {
        
    await Review.deleteMany({_id:{$in: listing.reviews}});
    }
})


const Listing = mongoose.models.Listing || mongoose.model("Listing", listingSchema);
module.exports = Listing;
