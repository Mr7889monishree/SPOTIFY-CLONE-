import { v2 as cloudinary } from 'cloudinary';

const connectcloudinary = async () => {
    await cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY, // Corrected key
        api_secret: process.env.CLOUDINARY_API_SECRET_KEY, // Corrected key
    });
};

export default connectcloudinary;
