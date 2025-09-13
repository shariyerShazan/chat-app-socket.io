import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const register = async (req , res)=>{
    try {
        const {fullName , email , password } = req.body
        if(!fullName || !email || !password ){
            return res.status(404).json({
                message : "Someting is missing." ,
                success: false
            })
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(404).json({
                message : "User already exist with this email" ,
                success: false
            })
        }
        if(password < 6){
            return res.status(400).json({
                message: "Passowrd must be 6 cherecter" ,
                success: false
            })
        }
        if(!/[a-zA-Z]/.test(password)){
            return res.status(400).json({
                message: "Passowrd must be contain a Letter" ,
                success: false
            })
        }
        if(!/[0-9]/.test(password)){
            return res.status(400).json({
                message: "Passowrd must be contain a Number" ,
                success: false
            })
        }
        const hashPassword = await bcrypt.hash(password , 10)
        await User.create({
            fullName ,
            email ,
            password : hashPassword
        })
        return res.status(200).json({
            message : "User register successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "Internal server error" ,
            success: false
        })
    }
}

export const login = async (req , res)=>{
    try {
        const {email , password} = req.body
        if(!email || !password){
            return res.status(404).json({
                message : "Someting is missing." ,
                success: false
            })
        } 
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                message : "User not found with this email" ,
                success: false
            })
        }
        const correctPass = await bcrypt.compare(password , user.password)
        if(!correctPass){
            return res.status(404).json({
                message : "Password is incorrect" ,
                success: false
            })
        }
        const token =  jwt.sign({userId : user._id} , process.env.JWT_SECRET_KEY , {expiresIn: "3d"})
        return res.status(200).cookie("token" , token , { 
            httpOnly: true,        
            secure: true, 
            sameSite: "strict",
            maxAge: 3 * 24 * 60 * 60 * 1000, 
        }).json({
            message: `Welcome back ${user.fullName}`,
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "Internal server error" ,
            success: false
        })
    }
}



export const logout = async (_, res) => {
    try {
      return res
        .status(200)
        .cookie("token", "", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          expires: new Date(0), 
        })
        .json({
          message: "Logged out successfully",
          success: true,
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };