import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import sequelize from "./src/config/database.js";
import routes from "./src/routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.use("/api/v1", routes);

const PORT = process.env.PORT || 8080;
// Test database connection and sync models
const startServer = async () => {
  const maxRetries = 10; // number of attempts
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      await sequelize.authenticate();
      console.log("✅ Database connected successfully.");

      await sequelize.sync({ alter: true });
      console.log("✅ All models synchronized.");

      app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
      });

      return; // success → exit loop

    } catch (error) {
      attempts++;
      console.log(
        `⚠️ Unable to connect to DB (attempt ${attempts}/${maxRetries}), retrying in 5 seconds...`
      );
      await new Promise(res => setTimeout(res, 5000));
    }
  }

  console.error("❌ Could not connect to the database after several attempts. Exiting...");
  process.exit(1);
};

startServer();
