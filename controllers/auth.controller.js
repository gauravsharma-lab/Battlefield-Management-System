exports.signup = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,

  });

  await user.save();

  res.json({ message: "User created" });
};