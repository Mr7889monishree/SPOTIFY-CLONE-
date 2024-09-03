import mongoose, { Schema } from 'mongoose'

//structure of our album along with types this is required for working on api controllers 
const AlbumSchema = new Schema({
    name:{type:String,required:true,},
    desc:{type:String,required:true},
    bgcolor:{type:String,required:true},
    image:{type:String,required:true},

})

const albumModel= mongoose.model.album || mongoose.model("Album",AlbumSchema);


export default albumModel;