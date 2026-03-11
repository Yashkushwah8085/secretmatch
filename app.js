import cookieParser from "cookie-parser"
import express from "express"
import Database from "./Config/Connection.js"
import AuthRouter from "./Routes/AuthRouter.js"
import UserRouter from "./Routes/userRouter.js"
import dotenv from "dotenv";



const app = express()
dotenv.config();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use ("/user",AuthRouter)
app.use ("/user",UserRouter)

app.listen(3000)
console.log("server invoked at link http://localhost:3000")