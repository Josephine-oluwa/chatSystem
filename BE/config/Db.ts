import mongoose from "mongoose";

const URL: string = "mongodb+srv://josephine:josephine@cluster0.v1d2dga.mongodb.net/chatBE?retryWrites=true&w=majority";
// const URL: string = "mongodb://0.0.0.0:27017/dbs";

export const mainConnection = async () => {
  try {
    await mongoose.connect(URL).then(() => {
      console.log("DB connected...🚀🚀🚀");
    });
  } catch (error) {
    console.log(error)
  }
};