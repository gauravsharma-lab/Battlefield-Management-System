const mongoose = require("mongoose");

const scenarioSchema = new mongoose.Schema({
  scenarioName: { type: String, required: true },
  weather: { type: String, required: true },
  missionType: { type: String, required: true },
  terrainType: { type: String, required: true },

  friendlyAssets: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Asset" }
  ],

  enemyAssets: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Asset" }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Scenario", scenarioSchema);