import { User } from "../models/user.model"
import bcrypt from "bcryptjs"

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