const express = require("express");
const router = express.Router();
const Asset = require("../models/Asset");
const authMiddleware = require("../middleware/auth");

// 🔥 CREATE ASSET
router.post("/", authMiddleware, async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("USER:", req.user);

    const asset = new Asset({
      ...req.body,
      userId: req.user.userId
    });

    const saved = await asset.save();
    res.status(201).json(saved);

  } catch (err) {
    console.log("SAVE ERROR:", err.message);

    res.status(400).json({
      message: "Invalid asset data",
      error: err.message
    });
  }
});

// 🔥 GET USER ASSETS
router.get("/", authMiddleware, async (req, res) => {
  try {
    console.log("GET USER:", req.user.userId);

    const assets = await Asset.find({
      userId: req.user.userId
    });

    console.log("FOUND ASSETS:", assets.length);

    res.json(assets);

  } catch (err) {
    console.log("FETCH ERROR:", err.message);

    res.status(500).json({
      message: "Failed to fetch assets",
      error: err.message
    });
  }
});


router.put("/:id", authMiddleware, async (req, res) => {
  const updated = await Asset.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: req.user.userId
    },
    { $set: req.body },
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ message: "Asset not found" });
  }

  res.json(updated);
});
module.exports = router;