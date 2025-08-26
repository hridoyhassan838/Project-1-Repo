
import { connectDB } from "@/lib/databaseConnection";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const connection = await connectDB();
    
    // Get database connection info
    const dbName = connection.connection.db.databaseName;
    const readyState = connection.connection.readyState;
    
    const stateMap = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    return NextResponse.json({
      success: true,
      message: "MongoDB connection successful!",
      database: {
        name: dbName,
        status: stateMap[readyState] || 'unknown',
        host: connection.connection.host,
        port: connection.connection.port
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "MongoDB connection failed!",
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
