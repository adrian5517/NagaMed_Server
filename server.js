require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Added this line to require the cors package

// Import Routes
const authRoutes = require('./routers/authRoutes');
const userRoutes = require('./routers/userRouter');
const appointmentRoutes = require('./routers/appointmentRoutes');
const doctorRoutes = require("./routers/doctorRoutes");
const clinicRoutes = require('./routers/clinicRoutes')
const feedbackRoutes = require('./routers/feedbackRoutes');
const systemFeedbackRoutes = require('./routers/systemFeedbackRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));  // Enabling CORS for your frontend on port 3000

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/user', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use("/api/doctor", doctorRoutes);
app.use('/api/clinic', clinicRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/systemfeedback', systemFeedbackRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Irinuman Club');
});

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
