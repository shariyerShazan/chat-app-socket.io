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
        default: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    }
} , {timestamps: true})

export const User = mongoose.model("User" , userSchema)
