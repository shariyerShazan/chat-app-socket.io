import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const isAuthenticated = async (req , res, next)=>{
    try {
        const {token }= req.cookies
        if(!token){
            return res.status(400).json({
                message : "User not authenticated" ,
                success: false
            })
        }
        const decode = await jwt.verify(token , process.env.JWT_SECRET_KEY)
        if(!decode){
            return res.status(400).json({
                message : "Invalid token" ,
                success: false
            })
        }
        req.userId = decode.userId
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message :"Internal server error" ,
            success: false
        })
    }
}