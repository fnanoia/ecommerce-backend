import config from "config";
import mongoose from "mongoose";
import { firebaseConnection } from "./firebase";

//introducir variable de entorno y conectar a la bd que sea necesaria
async function connection() {
  const MONGO_URI = config.get<string>("MONGO_URI");
  const MONGO_DB_NAME = config.get<string>("MONGO_DB_NAME");

  try {
    if (process.env.DB_ENV === "firebase") {
      await firebaseConnection;
      console.log("Firebase connected successfully");
    } else {
      await mongoose.connect(MONGO_URI, { dbName: MONGO_DB_NAME });
      console.log("MongoDB connected successfully");
    }
  } catch (err: any) {
    throw new Error(err);
  }
}

export default connection;
