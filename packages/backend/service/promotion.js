const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a Mongoose Schema for promotions
const promotionSchema = new Schema(
  {
    name: { type: String },
    place: { type: String},
    price: { type: String},
    allDay: { type: Boolean },
    allWeek: { type: Boolean },
    startHours: { type: String },
    endHours: { type: String },
    description: { type: String },
    category: { type: mongoose.Schema.Types.Mixed },
    day: { type: mongoose.Schema.Types.Mixed},
    website: {type: String},
    googleMaps: { type: String },
    link: { type: String },
    verified: { type: Boolean, default: false },
    outdated: { type: Boolean, default: false }
  },
  { timestamps: true } 
);

// Create a Mongoose model based on the schema
const Promotion = mongoose.model("Promotion", promotionSchema);

module.exports = Promotion;
