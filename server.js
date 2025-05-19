require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const authRoutes = require('./routers/authRoutes');
const userRoutes = require('./routers/userRouter');
const appointmentRoutes = require('./routers/appointmentRoutes');
const doctorRoutes = require("./routers/doctorRoutes");
const clinicRoutes = require('./routers/clinicRoutes');
const feedbackRoutes = require('./routers/feedbackRoutes');
const systemFeedbackRoutes = require('./routers/systemFeedbackRoutes');
const doctorAccRoutes = require('./routers/doctorAccRoutes');
const cron = require('node-cron');

const app = express();

// Middleware
app.use(cors({ 
  origin: 'http://localhost:3000', 
  credentials: true                
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use("/api/doctor", doctorRoutes);
app.use('/api/clinic', clinicRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/systemfeedback', systemFeedbackRoutes);
app.use('/api/doctor', doctorAccRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to Irinuman Club');
});

// Cron Job Example (runs every 15 mins)
const job = cron.schedule("*/15 * * * *", () => {
  console.log("Cron job executed: Running every 15 minutes.");
}, { scheduled: false });

job.start();

// Database Connection
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('Database connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database Connection Error:', err);
  });
