import app from "./app";
import dotenv from "dotenv";
import { AppDataSource } from "./infrastructure/database/data-source";
import open from "open";

dotenv.config();

AppDataSource.initialize().then(async () => {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    const docsUrl = `http://localhost:${port}/api-docs`;
    console.log(`🚀 Server is running on port: ${port}`);
    console.log(`📖 API Docs available at: ${docsUrl}`);
    //open(docsUrl);
  });
});
