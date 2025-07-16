import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true

    },
    email:{
       type:String,
       unique:true,
       requred:true
    },
    password:{
        type:String,
        reruired:true
    },
    
}, {Timestamp:true})

const adminModel = mongoose.model.admin || mongoose.model("admin",adminSchema);
export default adminModel;