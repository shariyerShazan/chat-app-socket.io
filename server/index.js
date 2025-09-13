import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from "./utils/connectDB.js"
import userRoutes from "./routes/user.route.js"
import messageRoutes from "./routes/message.route.js"

const app = express()

// middlewares
app.use(cookieParser)
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors({
    origin:[ "https://localhost:5173"] ,
    credentials: true
}))



// routes
app.get("/" , (_ , res)=>{
    try {
        res.status(200).json({
            message: "It's server home page" ,
            success: true
        })
    } catch (error) {
        console.log(error)
       return res.status(500).json({
            message : "Internal server error" ,
            success: false
        })
    }
})
// api's
app.use("/api/users" , userRoutes)
app.use("/api/messages" , messageRoutes)

// servers
const PORT = process.env.PORT || 7005
const runServer = async ()=>{
     try {
        await connectDB()
        app.listen(PORT , ()=>{
            console.log(`Your server is running at https://localhost:${PORT}`)
        })
     } catch (error) {
        console.log(error)
     }
}
runServer()