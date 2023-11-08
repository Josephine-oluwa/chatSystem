
import mongoose from "mongoose";

const URL: string = "mongodb://0.0.0.0:27017/dbs";

export const mainConnection = async () => {
  try {
    await mongoose.connect(URL).then(() => {
      console.log("DB connected...🚀🚀🚀");
    });
  } catch (error) {
    console.log(error);
  }
};