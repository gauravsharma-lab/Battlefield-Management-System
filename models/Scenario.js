const mongoose = require("mongoose");

const scenarioSchema = new mongoose.Schema(
  {
    scenarioName: { type: String, required: true },

    weather: {
      type: String,
      enum: ["clear", "fog", "rain", "storm"],
      default: "clear",
    },

    missionType: {
      type: String,
      enum: ["interception", "attack", "defense", "recon"],
      required: true,
    },

    terrainType: {
      type: String,
      enum: ["desert", "mountain", "urban", "sea"],
      required: true,
    },

    friendlyAssets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset",
      },
    ],

    enemyAssets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset",
      },
    ],

    // 🔥 ADD THIS (same as Asset)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scenario", scenarioSchema);