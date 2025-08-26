import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URI;

if (!MONGODB_URL) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 60000,
      connectTimeoutMS: 10000,
    };

    cached.promise = mongoose.connect(MONGODB_URL, opts);
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connected successfully");
    return cached.conn;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    
    // More detailed error information
    if (error.message.includes('IP')) {
      console.error("💡 Solution: Add 0.0.0.0/0 to your MongoDB Atlas IP whitelist");
      console.error("💡 Go to Network Access > Add IP Address > Allow Access from Anywhere");
    }
    
    throw error;
  }
};
