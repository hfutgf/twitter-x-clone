import mongoose, { ConnectOptions } from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.DATABASE_URL) {
    console.error("MONGO URL is not defined");
  }

  if (isConnected) {
    return;
  }
  
  try {
    const options: ConnectOptions = {
      dbName: "twitter-clone",
      autoCreate: true,
    };

    await mongoose.connect(`${process.env.DATABASE_URL}`, options);
    isConnected = true;
    console.log('CONNECTED TO DATABASE')
  } catch (error) {
    console.log("Error connecting to database");
  }
};
