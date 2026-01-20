import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.MONGO_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" MongoDB Connected Successfully");
    
  } catch (err) {
    console.log("err:"+err);
    
    console.error(" MongoDB Connection Failed");
 
  }
};

export default connectDB;
