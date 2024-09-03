import express from 'express';
import { addAlbum, listAlbum, removeAlbum } from '../Controllers/Albumcontroller.js';
import upload from '../middleware/multer.js';

const Albumrouter = express.Router();

// Route for adding a new album with an image upload
Albumrouter.post('/add', upload.single('image'), addAlbum);

// Route for listing all albums
Albumrouter.get('/list', listAlbum);

// Route for removing an album
Albumrouter.post('/remove', removeAlbum);

export default Albumrouter;
