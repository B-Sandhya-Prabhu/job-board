const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',  // Replace with your email
    pass: 'yourpassword'           // Replace with your password
  }
});

router.post('/apply', async (req, res) => {
  const { jobId, userId } = req.body;

  // Send email to employer
  const mailOptions = {
    from: 'youremail@gmail.com',
    to: 'employeremail@example.com',  // Get employer email from DB
    subject: 'New Job Application',
    text: 'A new candidate has applied for the job!'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email');
    } else {
      res.json({ message: 'Application submitted and email sent' });
    }
  });
});

const multer = require('multer');
const path = require('path');

// Storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  // Append the file extension
  }
});

const upload = multer({ storage: storage });

// Route to apply for a job with resume upload
router.post('/apply', upload.single('resume'), async (req, res) => {
  const { jobId, userId } = req.body;
  const resume = req.file.filename;

  // You can now save resume info to the DB and send an email notification if needed
  res.json({ message: 'Application submitted', resume });
});
