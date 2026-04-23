const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    type: {
      type: String,
      enum: ["fighter", "bomber", "radar", "sam", "airbase", "enemy_aircraft"],
      required: true,
    },

    team: {
      type: String,
      enum: ["friendly", "enemy"],
      required: true,
    },

    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },

    speed: { type: Number, default: 0 },
    fuel: { type: Number, default: 100 },

    radarRange: { type: Number, default: 0 },
    weaponRange: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["active", "destroyed", "damaged", "hidden"],
      default: "active",
    },

    // 🔥 MUST BE INSIDE SCHEMA
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Asset", assetSchema);