const Scenario = require("../models/Scenario");

// CREATE SCENARIO
exports.createScenario = async (req, res) => {
  try {
    const scenario = await Scenario.create(req.body);

    res.status(201).json({
      success: true,
      message: "Scenario created successfully",
      data: scenario,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// GET ALL SCENARIOS
exports.getScenarios = async (req, res) => {
  try {
    const scenarios = await Scenario.find()
      .populate("friendlyAssets")
      .populate("enemyAssets");

    res.json({
      success: true,
      data: scenarios,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET SINGLE SCENARIO
exports.getScenarioById = async (req, res) => {
  try {
    const scenario = await Scenario.findById(req.params.id)
      .populate("friendlyAssets")
      .populate("enemyAssets");

    if (!scenario) {
      return res.status(404).json({
        success: false,
        message: "Scenario not found",
      });
    }

    res.json({
      success: true,
      data: scenario,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// UPDATE SCENARIO
exports.updateScenario = async (req, res) => {
  try {
    const updated = await Scenario.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Scenario not found",
      });
    }

    res.json({
      success: true,
      message: "Scenario updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE SCENARIO
exports.deleteScenario = async (req, res) => {
  try {
    const deleted = await Scenario.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Scenario not found",
      });
    }

    res.json({
      success: true,
      message: "Scenario deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};