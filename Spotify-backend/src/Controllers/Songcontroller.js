import {v2 as cloudinary} from 'cloudinary'
import songModel from '../models/Songmodels.js'
const addSong=async(req,res)=>{
    try {
        const {name,desc,album} = req.body;
        const audioFile=req.files.audio[0]; //we have upload both the audio and image in the cloudinary storage to upload this all in cloudinary
        const imageFile=req.files.image[0];//we use cloudinary uploader
        //once it gets uploaded the response will be stored in this variable and it will hold a secured url through which we can access our files like audio or image
        const audioUpload=await cloudinary.uploader.upload(audioFile.path,{resource_type:'video'});
        const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'});
        const duration=`${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration % 60)}`;
        console.log(name,desc,imageUpload,audioUpload);
        

        const songData ={
            name,
            desc,
            album,
            image:imageUpload.secure_url,
            file:audioUpload.secure_url,
            duration,
        }
         const song =songModel(songData);
        await song.save();
        res.json({success:true,message:"Song added"})
    } catch (error) {
       res.json({success:false,message:error.message}) 
        
    } 

}

const listSong=async(req,res)=>{
    try {
        const allSongs= await songModel.find({}) //empty object so that we get all the data from the songmodel and this will be stored in this variable
        res.json({sucess:true,songs:allSongs})
    } catch (error) {
        res.json({success:false});
        
    }

}

const Removesong=async(req,res)=>{
    try {
        await songModel.findByIdAndDelete(req.body.id);
        res.json({sucess:true,message:"song Removed"});
    } catch (error) {
        res.json({sucess:false,message:"Song not removed"});
        
    }
}

export {addSong,listSong,Removesong}