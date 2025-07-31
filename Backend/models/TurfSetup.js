const mongoose = require("mongoose");

const turfSchema = new mongoose.Schema({
  uid : { type: mongoose.Schema.Types.ObjectId, required: true },
  primaryImage: { type: String },
  images: [{ type: String }],

  sports: [
    {
      name: { type: String, required: true },
      courtCount: { type: Number, required: true },

      minSlotDuration: {
        type: String,
        enum: ["30min", "45min", "1hr", "1.5hr", "2hr"],
        required: true,
      },

      amountPerSlot: { type: Number, required: true },
      advanceAmount: { type: Number, default: 0 },

      availability: {
        sameForAll: { type: Boolean, required: true },

        defaultStart: { type: String }, // HH:mm
        defaultEnd: { type: String },   // HH:mm

        customDays: [
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
                "Sunday",
              ],
            },
            isOpen: { type: Boolean, default: false },
            startTime: { type: String }, // HH:mm
            endTime: { type: String },   // HH:mm
          },
        ],
      },
    },
  ],

  amenities: [{ type: String }],

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TurfSetup", turfSetupSchema);
