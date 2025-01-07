const express = require('express');
const app = express();
app.use(express.json());

app.post('/users', (req, res, next) => {
  try {
    // ... process the request ...
    // Example of throwing an error
    if (!req.body.name) {
      throw new Error('Name field is required!');
    }
    // ... further processing ...
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

// Error handling middleware for different error types
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === 'ValidationError') {
    res.status(400).json({ errors: err.errors });
  } else if (err.code === 11000) { // Duplicate key error
    res.status(400).json({ error: 'Duplicate key entered.' });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
});