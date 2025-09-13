import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { getMessage, getOtherUser, sendMessage } from "../controllers/message.controller.js"

const route = express.Router()

route.post("/send-message" , isAuthenticated , sendMessage)
route.get("/get-message/:userToChatId" , isAuthenticated , getMessage)
route.get("/other-users" , isAuthenticated , getOtherUser)

export default route