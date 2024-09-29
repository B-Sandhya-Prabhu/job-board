const express = require('express');
const Job = require('./models/job');
const router = express.Router();

// Get all jobs
router.get('/jobs', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// Create a job (Employer)
router.post('/jobs', async (req, res) => {
  const { title, description, company, location, salary, postedBy } = req.body;
  const newJob = new Job({ title, description, company, location, salary, postedBy });
  await newJob.save();
  res.json(newJob);
});

router.get('/jobs', async (req, res) => {
    const { q } = req.query;
    const jobs = await Job.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { company: { $regex: q, $options: 'i' } },
        { location: { $regex: q, $options: 'i' } }
      ]
    });
    res.json(jobs);
  });
  
  
module.exports = router;

