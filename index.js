const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('❌ MongoDB connection failed', err);
    process.exit(1);
  });

// Middleware
app.use(helmet()); // Set security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Body parser for JSON

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api', require('./routes/stocks'));

// Centralized error handler
app.use(errorHandler);

// Handle all other routes by serving the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
