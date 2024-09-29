const express = require('express');
const Job = require('./models/job');
const authMiddleware = require('./middleware/authMiddleware');
const router = express.Router();

router.post('/jobs', authMiddleware, async (req, res) => {
  const { title, description, company, location, salary } = req.body;
  const newJob = new Job({
    title,
    description,
    company,
    location,
    salary,
    postedBy: req.user.userId,
  });
  await newJob.save();
  res.json(newJob);
});

module.exports = router;
