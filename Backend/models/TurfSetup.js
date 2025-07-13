const mongoose = require("mongoose");

const turfSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true },
  name: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number] }  // [longitude, latitude]
  },
  primaryImage: { type: String },
  images: [{ type: String }],

  sports: [
    {
      name: { type: String, required: true },
      fromTime: { type: String },   
      toTime: { type: String },
      pricing: {
        '30min': Number,
        '45min': Number,
        '1hr': Number,
        '2hr': Number
      }
    }
  ],

  operationalDays: [
    {
      day: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        required: true
      },
      isOpen: { type: Boolean, default: false },
      openingTime: { type: String },  
      closingTime: { type: String }  
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Turf", turfSchema);
