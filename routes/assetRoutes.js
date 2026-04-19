console.log("Asset routes loaded ✅");
const express = require("express");
const router = express.Router();
const Asset = require("../models/Asset");

// CREATE asset
router.post("/", async (req, res) => {
  const asset = new Asset(req.body);
  await asset.save();
  res.json(asset);
});

// GET all assets
router.get("/", async (req, res) => {
  const assets = await Asset.find();
  res.json(assets);
});

//get by id
router.get("/:id", async (req, res) => {
  const asset = await Asset.findById(req.params.id);
  res.json(asset);
});

//update api
router.put("/:id", async (req, res) => {
  try {
    const updated = await Asset.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//delete api
router.delete("/:id", async (req, res) => {
  try {
    await Asset.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;