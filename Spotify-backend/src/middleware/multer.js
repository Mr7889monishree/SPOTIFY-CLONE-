import multer from 'multer';

// Set up storage configuration with a destination folder and filename
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        // Save the file with its original name
        callback(null, file.originalname);
    }
})


// Set up multer with the storage and file filter configuration
const upload = multer({storage});

// Export the configured upload middleware
export default upload;
