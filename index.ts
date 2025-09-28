import app from "./app";
import dotenv from "dotenv";
dotenv.config();
// import { AppDataSource } from "./database/data-source";
import { AppDataSource } from "./src/infrastructure/database/data-source";

AppDataSource.initialize().then(async () => {
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server is running on port: ${process.env.PORT}`);
  });
});
