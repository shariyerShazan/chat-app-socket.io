import { Message } from "../models/message.model.js"
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


export const getMessage = async (req , res)=>{
    try {
         const {userToChatId} = req.body
         const userToChat = await User.findById(userToChatId)
         if(!userToChat){
            return res.status(404).json({
                message : "User not found" ,
                success: false 
            })
         }
         const messages = await Message.find({
            $or:[
                {senderId: req.userId , reciverId: userToChatId} ,
                {senderId: userToChatId , reciverId: req.userId } ,

            ]
         })
         if(messages.length === 0){
            return res.status(400).json({
                messages : "Message not found" ,
                success: false
            })
         }
         return res.status(200).json({
            message: "here is meessage" ,
            success: true ,
            messages
         })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "Internal server error" ,
            success: fales
        })
    }
}