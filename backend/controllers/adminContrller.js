import adminModel from "../models/adminModel.js"
import bcrypt from "bcryptjs"
import { json, response } from "express"
import jwt from "jsonwebtoken"
import path from "path"
import musicModel from "../models/musicModel.js"

// Register
const register = async (req,res) =>{
    try{
       const{username,email,password} = req.body
       if(!username || !email || !password){
        return res.status(400).json({success:false, message: "All feilds Are Required"})
       }

       const existingUser = await adminModel.findOne({email})
       if(existingUser){
        return res.status(409).json({success:false, message:"User already exists "})
       }

       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(password,salt )
       
       const newUser = new adminModel({
        username,
        email,
        password: hashedPassword
       })

       await newUser.save()

      const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
      );

       res.cookie("token", token, {
       httpOnly: true,   // recommended for security
       secure: false,    // set to true in production with HTTPS
       sameSite: 'lax',
       maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

       const userResponce = {
        id:newUser._id,
        username:newUser.username,
        email:newUser.email,
       }

       res.status(201).json({success:true,message:"Register Successfull",user: userResponce , token})


    }catch(error){
    //  console.log(Error)
     res.status(500).json({success:false,message:"Interval server error"})
    }
}

// Login 
const login = async (req,res) =>{
    try {
        const{email,password} = req.body

        if(!email || !password){
            return res.status(400).json({success:false, message: "All feilds Are Required"})
        }

        const user = await adminModel.findOne({email})
            if(!user){
             return res.status(409).json({success:false, message:"User Not Found "})
            }
        
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(401).json({success:false, message:"Invalid Credentials"})
        }

        const token = jwt.sign(
         { id: user._id },
          process.env.JWT_SECRET,
         { expiresIn: '7d' }
         );

         res.cookie("token", token, {
         httpOnly: true,   // recommended for security
         secure: false,    // set to true in production with HTTPS
         sameSite: 'lax',
         maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
         });


        const userResponce = {
          id:user._id,
          username:user.username,
          email:user.email,
         }
         res.status(200).json({success:true,message:"Login Successfull",user: userResponce,token})


    } catch (error) {
         console.log(error)
     res.status(500).json({success:false,message:"Interval server error"})
    }
}

// Upload music
const uploadMusic = async (req,res)=>{
    try {

        const {title,artist} = req.body

        if(!title || !artist){
            return res.status(400).jaon({success:false,message:"All fields are required "})
        }

        const musicFile = req.files.music?.[0]
        const imageFile = req.files.image?.[0]

        if(!musicFile){
            return res.status(400).json({success:false,message:"Plese Upload the music file"})
        }
          if(!imageFile){
            return res.status(400).json({success:false,message:"Image file is required"})
        }

        const allowedExtensions = ['.mp3','.wav','.jpg','.jpeg','.png','.webp'];
        const musicExt = path.extname(musicFile.originalname).toLowerCase();
        const imageExt = path.extname(imageFile.originalname).toLowerCase();

        if(!allowedExtensions.includes(musicExt) || !allowedExtensions.includes(imageExt)){
            return res.status(400).json({success:false,message:"Invalid File Type"})
        }

        const filePath = musicFile.path;
        const imageFilePath = imageFile.path;

        const music = new musicModel({
            title,
            artist,
            filePath,
            imageFilePath
        })
        await music.save()

        res.status(201).json({
            success:true,message:"Music file uploaded Successfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Interval server error"})

    }
}

// findMusic
const getMusic = async (req,res)=>{
    try {
        const musics = await musicModel.find()
        if(!musics){
            return res.json({success:false,message:"Can't Find Msic File"})
        }
        res.json({success:true, musics})
        
    } catch (error) {
         console.log(error)
        res.status(500).json({success:false,message:"Interval server error"})
    }
}

// delete music
const deleteMusic = async(req,res)=>{
    try {
        const {id} = req.params;
        const music = await musicModel.findByIdAndDelete(id);
        if(!music){
            return res.json({success:false,message:"Nothing to delete"})
        }
        res.status(200).json({success:true,message:"File Deleted Successfully",music })
        
    } catch (error) {
          console.log(error)
        res.status(500).json({success:false,message:"Interval server error"})
    }
}


export {register,login,uploadMusic,getMusic,deleteMusic}