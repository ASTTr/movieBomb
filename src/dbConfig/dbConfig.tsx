import mongoose from "mongoose";

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGOOSE_URL);

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
