import { User } from "../models/user.model.js"

export const getOtherUser = async (req , res)=>{
    try {
        const otherUsers = await User.find({_id : {$ne : req.userId}})
        if(otherUsers.length === 0){
            return res.status(400).json({
                message : "No user Found" ,
                success: false
            })
        }
        return res.status(200).json({
            message : "Other users here",
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "Internal server error" ,
            success: fales
        })
    }
}