import mongoose from "mongoose";

const url = process.env.MONGO_URI;

async function dbConnection() {
  try {
    await mongoose.connect(url);
    console.log("Database connected");
  } catch (error) {
    console.log("Some error occurred", error);
    throw error
  }
}

export default dbConnection;
