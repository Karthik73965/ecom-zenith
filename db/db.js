import mongoose from "mongoose";
import dotenv from 'dotenv'


dotenv.config();

export const DbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb connected");
    return true;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
