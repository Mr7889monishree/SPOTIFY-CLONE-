import { v2 as cloudinary } from 'cloudinary';
import albumModel from '../models/Albummodel.js';

const addAlbum = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);

        const { name, desc, bgcolor } = req.body;
        const imageFile = req.file;
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'raw' });

        const albumData = {
            name,
            desc,
            bgcolor,
            image: imageUpload.secure_url,
        };

        const album = new albumModel(albumData);
        await album.save();
        res.json({ success: true, message: "Album added" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const listAlbum = async (req, res) => {
    try {
        const allAlbums = await albumModel.find({});
        return res.json({ success: true, album: allAlbums });
    } catch (error) {
        console.error("Error listing albums:", error);
        return res.status(500).json({ success: false, message: "Failed to list albums" });
    }
};

const removeAlbum = async (req, res) => {
    try {
        await albumModel.findByIdAndDelete(req.body.id);
        return res.json({ success: true, message: "Album removed" });
    } catch (error) {
        console.error("Error removing album:", error);
        return res.status(500).json({ success: false, message: "Failed to remove album" });
    }
};

export { addAlbum, listAlbum, removeAlbum };
