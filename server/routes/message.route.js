import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { getMessage, getOtherUser, sendMessage } from "../controllers/message.controller.js"
import { upload } from "../utils/multer.js"

const route = express.Router()

route.post("/send-message/:userToChatId" , isAuthenticated  , upload.single("image") ,  sendMessage)
route.get("/get-message/:userToChatId" , isAuthenticated , getMessage)
route.get("/other-users" , isAuthenticated , getOtherUser)

export default route 