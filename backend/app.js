const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Job model
const Job = require('./models/job');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON data

// Connect to MongoDB
mongoose.connect('mongodb+srv://mrpriya324:Barbie1234$@cluster0.qnu2hqe.mongodb.net/job-board', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error:', err));

// Create a job (POST request)
app.post('/jobs', async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all jobs (GET request)
app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
