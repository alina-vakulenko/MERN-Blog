import mongoose from "mongoose";
import app from "./app";
import envVariables from "./env";

const port = envVariables.PORT;
const dbUrl = `mongodb://${envVariables.MONGODB_USERNAME}:${envVariables.MONGODB_PASSWORD}@mongo:27017/${envVariables.MONGODB_DATABASE_NAME}?authSource=admin`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
  } catch (err) {
    console.log("DB CONNECTION ERROR", err);
  }
};

connectDB();

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => console.log(`Server is running on port ${port}`));
});
