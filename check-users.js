const mongoose = require('mongoose');
const User = require('./models/User.model');

async function checkAdmin() {
  await mongoose.connect("mongodb://127.0.0.1:27017/battlefield");
  
  const admins = await User.find({ role: 'admin' });
  console.log("--- ADMINS FOUND ---");
  console.log(admins.map(a => ({ username: a.username, email: a.email, role: a.role })));
  
  const all = await User.find();
  console.log("--- ALL USERS ---");
  console.log(all.map(a => ({ username: a.username, email: a.email, role: a.role })));

  process.exit();
}

checkAdmin();
