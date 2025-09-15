import express from "express"
import { getUserById, login, logout, register, updateProfile } from "../controllers/user.controller.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { upload } from "../utils/multer.js"

const route = express.Router()

route.post("/register" , register)
route.post("/login" , login)
route.post("/logout" , logout)
route.post("/update-profile" , isAuthenticated , upload.single("profilePicture") , updateProfile)
route.get("/user/:userId" , isAuthenticated , getUserById)

export default route