import { Message } from "../models/message.model.js"
import { User } from "../models/user.model.js"
import { uploadPhoto } from "../utils/cloudinary.js"

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
            success: true ,
            otherUsers
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
         const {userToChatId} = req.params
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
            chats:  messages
         })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "Internal server error" ,
            success: fales
        })
    }
}



export const sendMessage = async (req, res) => {
    try {
      const { text } = req.body;
      const { userToChatId } = req.params;
      const file = req.file; 
  
      if (!text && !file) {
        return res.status(400).json({
          message: "Message or image is required",
          success: false,
        });
      }
  
      const receiver = await User.findById(userToChatId);
      if (!receiver) {
        return res.status(404).json({
          message: "Receiver not found",
          success: false,
        });
      }
  
      let imageUrl = null;
      let imagePublicId = null;
  
      if (file) {
        const result = await uploadPhoto(file.buffer, "chat_images");
        imageUrl = result.secure_url;
        imagePublicId = result.public_id;
      }
  
      const message = await Message.create({
        senderId: req.userId,
        reciverId: userToChatId,
        text: text || "",
        image: imageUrl,
        imagePublicId: imagePublicId,
        createdAt: new Date(),
      });
  
      return res.status(200).json({
        message: "Message sent successfully",
        success: true,
        data: message,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };