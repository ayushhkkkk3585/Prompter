import mongoose from "mongoose";

let isConnected = false; // store connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log(" connection sucess ");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "PromptDB",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("mongo connected");
  } catch (error) {
    console.log("MongoDB connection error:", error);
    throw error;
  }
};
