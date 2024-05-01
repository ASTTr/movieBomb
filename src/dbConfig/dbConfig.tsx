import mongoose from "mongoose";

export const connect = async () => {
  try {
    mongoose.connect(mongodb://127.0.0.1:27017/movieBomb);

    const connection = mongoose.connection;
    connection.on("connected", () => console.log("connected to db"));
    connection.on("error", (err) => {
      console.log(
        "Mongodb connection error . please make sure mongodb process is running." +
          err
      );
      process.exit();
    });
  } catch (err) {
    console.log("something went wrong" + err);
  }
};
