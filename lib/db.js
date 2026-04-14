import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL;
let isConnected = false;

async function dbConnect() {
  if (isConnected) {
    console.log("Moongodb Already Connected");
    return;
  }
  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log("connected to mongodb", db);
  } catch (error) {
    console.error("Failed to connect", error);
    throw error;
  }
}

export default dbConnect;
