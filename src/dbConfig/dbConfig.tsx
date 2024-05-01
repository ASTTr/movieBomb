import mongoose from "mongoose";

export const connect = async () => {
  try {
    mongoose.connect(mongodb+srv://sondhiritik666:GXnJcGg6z0fmmIrX@cluster0.ix0bij3.mongodb.net/);

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
