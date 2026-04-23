

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User.model');

mongoose.connect('mongodb://127.0.0.1:27017/battlefield');

async function createAdmin() {

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Admin User",
    email: "admin@gmail.com",
    password: hashedPassword,
    role: "admin"
  });

  console.log("Admin created successfully");
  process.exit();
}

createAdmin();