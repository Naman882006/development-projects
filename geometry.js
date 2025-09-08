// updateGeometry.js
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const Listing = require("./models/listing");

mongoose.connect("mongodb://127.0.0.1:27017/trivana")
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err));

async function updateOldListings() {
  const listings = await Listing.find({ "geometry.coordinates": { $exists: false } });

  for (let listing of listings) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${listing.location}`
    );
    const data = await response.json();

    const place = data.find(item => item.addresstype === "city") || data[0];
    if (place) {
      listing.geometry = {
        type: "Point",
        coordinates: [parseFloat(place.lon), parseFloat(place.lat)]
      };
      await listing.save();
      console.log(`${listing.title} updated with geometry!`);
    }
  }

  mongoose.connection.close();
}

updateOldListings();


