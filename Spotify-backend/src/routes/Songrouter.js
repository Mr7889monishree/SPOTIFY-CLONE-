import { addSong,listSong,Removesong} from "../Controllers/Songcontroller.js";
import express from 'express'
import upload from "../middleware/multer.js";

const Songrouter=express.Router();


Songrouter.post('/add',upload.fields([{name:'image',maxCount:1},{name:'audio',maxCount:1}]),addSong);

Songrouter.get('/list',listSong);
Songrouter.post('/remove',Removesong);


export default Songrouter;