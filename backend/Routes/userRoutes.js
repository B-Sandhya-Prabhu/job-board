const express = require('express');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  const user = new User({ username, email, password, role });
  await user.save();
  res.json({ message: "User registered!" });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user._id, role: user.role }, 'secretkey');
  res.json({ token });
});

module.exports = router;
