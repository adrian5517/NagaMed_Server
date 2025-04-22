require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // <-- ADD THIS
const { Server } = require('socket.io'); // <-- ADD THIS

// Your route imports
const authRoutes = require('./routers/authRoutes');
const userRoutes = require('./routers/userRouter');
const appointmentRoutes = require('./routers/appointmentRoutes');
const doctorRoutes = require("./routers/doctorRoutes");
const clinicRoutes = require('./routers/clinicRoutes');
const feedbackRoutes = require('./routers/feedbackRoutes');
const systemFeedbackRoutes = require('./routers/systemFeedbackRoutes');

const app = express();
const server = http.createServer(app); // <-- USE THIS INSTEAD OF app.listen()
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // <-- your frontend URL
    methods: ['GET', 'POST']
  }
});

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

// Health Check Route
app.get('/', (req, res) => {
  res.send('Welcome to Irinuman Club');
});

// MongoDB and Server
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    server.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });


// 💬 Add this to handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('🔌 New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });

  // Add your custom events here
});
