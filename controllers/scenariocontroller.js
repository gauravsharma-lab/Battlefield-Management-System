const Scenario = require("../models/Scenario");

// CREATE
exports.createScenario = async (req, res) => {
  try {
    const scenario = await Scenario.create(req.body);
    res.json(scenario);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL
exports.getScenarios = async (req, res) => {
  try {
    const scenarios = await Scenario.find()
      .populate("friendlyAssets")
      .populate("enemyAssets");

    res.json(scenarios);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ONE
exports.getScenarioById = async (req, res) => {
  try {
    const scenario = await Scenario.findById(req.params.id)
      .populate("friendlyAssets")
      .populate("enemyAssets");

    res.json(scenario);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE
exports.updateScenario = async (req, res) => {
  try {
    const updated = await Scenario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE
exports.deleteScenario = async (req, res) => {
  try {
    await Scenario.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};