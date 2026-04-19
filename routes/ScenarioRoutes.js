const express = require("express");
const router = express.Router();

const {
  createScenario,
  getScenarios,
  getScenarioById,
  updateScenario,
  deleteScenario
} = require("../controllers/scenarioController");

// Routes
router.post("/", createScenario);
router.get("/", getScenarios);
router.get("/:id", getScenarioById);
router.put("/:id", updateScenario);
router.delete("/:id", deleteScenario);

module.exports = router;