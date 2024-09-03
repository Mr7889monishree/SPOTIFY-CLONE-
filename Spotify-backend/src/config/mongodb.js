import mongoose from 'mongoose';

// Function to connect to the database
const connectDB = async () => {
    try {
        // Mongoose event listeners for connection status
        mongoose.connection.on('connected', () => {
            console.log('Connected to the database');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Database connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Disconnected from the database');
        });

        // Connect to MongoDB
        await mongoose.connect(`${process.env.MONGODB_URI}/spotify`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 20000, // 20 seconds timeout for server selection
            socketTimeoutMS: 45000, // 45 seconds timeout for socket connection
        });

        console.log('MongoDB connection successful');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
