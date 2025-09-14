import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { getMessage, getOtherUser, sendMessage } from "../controllers/message.controller.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

// Routes
router.post("/send-message/:reciverId", isAuthenticated, upload.single("image"), sendMessage);
router.get("/get-message/:reciverId", isAuthenticated, getMessage);
router.get("/other-users", isAuthenticated, getOtherUser);

export default router;
