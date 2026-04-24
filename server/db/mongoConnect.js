import mongoose from "mongoose";

const mongoConnect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);  

        console.log("db connected!");

    }
    catch(err){
        console.log("error while connecting db!");
    }
}
export default mongoConnect;