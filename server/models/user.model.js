import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String ,
        required: true ,
        unique: true
    },
    fullName : {
        type: String ,
        required: true 
    },
    password: {
        type: String ,
        required: true,
        select : false
    },
    profilePicture: {
        type: String ,
        default: "https://i.pravatar.cc/40"
    },
    profilePhotoPublicId: {
        type: String
    } 
} , {timestamps: true})

export const User = mongoose.model("User" , userSchema)
