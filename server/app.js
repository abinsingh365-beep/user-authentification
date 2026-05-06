import express from "express"
import dotenv from "dotenv"
import mongoConnect from "./db/mongoConnect.js"
import sampleRoutes from "./routes/sampleRoutes.js"
import authRoutes from "./routes/authRoutes.js"

dotenv.config()
const app=express()

app.use(express.json());


// app.get("/test",(req,res,next)=>{
//  console.log("first middleware");
//  next()
 
// },
// (req, res, next)=>{
//     res.send("text sucessfull");
// })

mongoConnect();



app.use(express.static("../client"))

// app.use("/api/sample",sampleRoutes) 
app.use("/api/auth", authRoutes);


app.listen(process.env.PORT,()=>{
    console.log(` server running at the http://localhost:${process.env.PORT}`);
    
})
