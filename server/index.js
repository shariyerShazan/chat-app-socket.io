import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cookieParser)
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors({
    origin:[ "https://localhost:5173"] ,
    credentials: true
}))


const PORT = process.env.PORT
const runServer = async ()=>{
     try {
        app.listen(PORT , ()=>{
            console.log(`Your server is running at https://localhost:${PORT}`)
        })
     } catch (error) {
        console.log(error)
     }
}