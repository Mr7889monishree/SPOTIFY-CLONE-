import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import Songrouter from './src/routes/Songrouter.js';
import connectDB from './src/config/mongodb.js';
import connectcloudinary from './src/config/Cloudinary.js';
import Albumrouter from './src/routes/Albumroute.js';

// App configuration
const app = express();
const port = process.env.PORT || 3800; // Fallback port if not defined in .env
connectDB(); 
connectcloudinary(); 
// Connect to database and Cloudinary


// Middlewares
app.use(express.json()); // Parse JSON request bodies
const allowedOrigins = [
    'http://localhost:5173', // Front-end URL
    'http://localhost:5174', // Admin panel URL
  ];
  
const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
  
app.use(cors(corsOptions));

// Routes
app.use('/api/song', Songrouter);
app.use('/api/album', Albumrouter);

// Test route
app.get('/', (req, res) => {
    res.send("API WORKING");
});

// Start server
app.listen(port, (err) => {
    if (err) {
        console.log(`Error: ${err.message}`);
    } else {
        console.log(`The server is running on port ${port}`);
    }
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});
