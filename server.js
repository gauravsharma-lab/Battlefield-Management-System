
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require('./models/User.model');
const authRoutes = require('./routes/authRoutes');

const assetRoutes = require("./routes/assetRoutes");
const scenarioRoutes = require("./routes/ScenarioRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/battlefield")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/assets", assetRoutes);
app.use("/api/scenarios", scenarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ===== KEEP THIS AT END =====
app.listen(5000, () => {
  console.log("Server running on port 5000");
});