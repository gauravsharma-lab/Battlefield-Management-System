

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const assetRoutes = require("./routes/assetRoutes");
const scenarioRoutes = require("./routes/ScenarioRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:4200"
}));

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/battlefield")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/assets", assetRoutes);
app.use("/api/scenarios", scenarioRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});