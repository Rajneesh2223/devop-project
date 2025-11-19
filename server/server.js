import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

// --- Middleware ---
// This allows your client at localhost:3000 to make requests
app.use(cors({ origin: 'http://localhost:3000' }));
// This is CRITICAL for your API to read the { "name": "..." } data
app.use(express.json());

// --- MongoDB Connection ---
const mongoURL = process.env.MONGODB_URL;
mongoose.connect(mongoURL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Error connecting to MongoDB:', err.message));

// --- 1. Mongoose Schema & Model ---
// This defines the structure of the data you want to save
const userSchema = new mongoose.Schema({
  name: String,
  mobileNumber: String
});

// This creates a "User" model you can use to create/find/update users
const User = mongoose.model('User', userSchema);

// --- API Routes ---

// Your test route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// --- 2. NEW API ENDPOINT ---
// This is the API your React form will send data to
app.post('/api/users', async (req, res) => {
  try {
    // Get the name and mobileNumber from the request body
    const { name, mobileNumber } = req.body;

    // Basic validation
    if (!name || !mobileNumber) {
      return res.status(400).json({ message: 'Name and mobile number are required' });
    }

    // Create a new user document
    const newUser = new User({
      name: name,
      mobileNumber: mobileNumber
    });

    // Save the new user to the database
    await newUser.save();

    // Send the new user back as a success response
    res.status(201).json(newUser);

  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Error saving user' });
  }
});

// --- Start Server ---
app.listen(5000, () => {
  console.log('Server listening at http://localhost:5000');
});