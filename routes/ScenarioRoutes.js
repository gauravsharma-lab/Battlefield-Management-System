const express = require("express");
const router = express.Router();

const Scenario = require("../models/Scenario");
const authMiddleware = require("../middleware/auth");


// ✅ CREATE SCENARIO
router.post("/", authMiddleware, async (req, res) => {
  try {
    const scenario = new Scenario({
      ...req.body,
      userId: req.user.userId 
    });

    await scenario.save();
    res.status(201).json(scenario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET USER SCENARIOS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const filtered = await Scenario.find({ userId: req.user.userId });
    res.json(filtered);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ GET SINGLE
router.get("/:id", authMiddleware, async (req, res) => {
  try {

    const scenario = await Scenario.findOne({
      _id: req.params.id,
      userId: req.user.userId   // ✅ FIXED
    })
      .populate("friendlyAssets")
      .populate("enemyAssets");

    if (!scenario) {
      return res.status(404).json({ message: "Scenario not found" });
    }

    res.json(scenario);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ UPDATE
router.put("/:id", authMiddleware, async (req, res) => {
  try {

    const updateData = { ...req.body };
    delete updateData.userId; // Prevent override

    const updated = await Scenario.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId
      },
      { 
        $set: {
          scenarioName: req.body.scenarioName,
          weather: req.body.weather,
          missionType: req.body.missionType,
          terrainType: req.body.terrainType,
          description: req.body.description,
          friendlyAssets: req.body.friendlyAssets,
          enemyAssets: req.body.enemyAssets,
          // userId is EXPLICITLY NOT IN THE SET
        }
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {

    const deleted = await Scenario.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId   // ✅ FIXED
    });

    if (!deleted) {
      return res.status(404).json({ message: "Scenario not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;