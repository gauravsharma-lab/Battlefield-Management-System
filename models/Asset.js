const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  team: String,
  latitude: Number,
  longitude: Number,
  speed: Number,
  fuel: Number,
  radarRange: Number,
  weaponRange: Number,
  status: String
});

module.exports = mongoose.model("Asset", assetSchema);