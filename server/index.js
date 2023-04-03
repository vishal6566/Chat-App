const http=require("http")
const express=require("express")
const cors=require("cors")
const socketIO=require("socket.io")
const dotenv=require("dotenv").config()
const app=express()
const PORT= process.env.PORT|| 4500


app.use(cors())

app.get("/",(req,res)=>{
    res.send("working")
})

const server=http.createServer(app)

const io=socketIO(server)
io.on("connection",()=>{
    console.log("New Connection")
})

server.listen(PORT,()=>{
    console.log(`server is listenting on http://localhost:${PORT}`)
})