import mongoose from "mongoose";

const musicSchema  = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    artist:{
        type:String,
        required:true
    },
    filePath:{
        type:String,
        required:true
    },
    imageFilePath:{
        type:String,
        required:true
    }
},{timestamps:true})

const musicModel = mongoose.model.music || mongoose.model("music",musicSchema)

export default musicModel