import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { uploadPhoto } from "../utils/cloudinary.js";

// Get all other users except logged-in user
export const getOtherUser = async (req, res) => {
  try {
    const otherUsers = await User.find({ _id: { $ne: req.userId } });
    return res.status(200).json({
      message: otherUsers.length ? "Other users here" : "No user found",
      success: otherUsers.length > 0,
      otherUsers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Get messages between logged-in user and another user
export const getMessage = async (req, res) => {
  try {
    const { reciverId } = req.params;

    const receiver = await User.findById(reciverId);
    if (!receiver) return res.status(404).json({ message: "User not found", success: false });

    const chats = await Message.find({
      $or: [
        { senderId: req.userId, reciverId },
        { senderId: reciverId, reciverId: req.userId },
      ],
    })
      .sort({ createdAt: 1 }) // old -> new
      .populate("senderId", "fullName profilePicture")
      .populate("reciverId", "fullName profilePicture");

    return res.status(200).json({
      message: "Messages fetched",
      success: true,
      chats,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Send a new message
export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { reciverId } = req.params;
    const file = req.file;

    if (!text && !file) {
      return res.status(400).json({ message: "Message or image is required", success: false });
    }

    const receiver = await User.findById(reciverId);
    if (!receiver) return res.status(404).json({ message: "Receiver not found", success: false });

    let imageUrl = null;
    let imagePublicId = null;

    if (file) {
      const result = await uploadPhoto(file.buffer, "chat_images");
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    const message = await Message.create({
      senderId: req.userId,
      reciverId,
      text: text || "",
      image: imageUrl,
      imagePublicId,
      createdAt: new Date(),
    });

    // Populate sender & receiver for frontend
    await message.populate("senderId", "fullName profilePicture");
    await message.populate("reciverId", "fullName profilePicture");

    return res.status(200).json({ message: "Message sent successfully", success: true, data: message });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
