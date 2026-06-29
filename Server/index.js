import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import prisma from "./src/config/prisma.js";
import logger from "./src/utils/logger.js";

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await prisma.$connect();
    logger.info("✅ Database connected");

    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
   logger.error("❌ Failed to start server", err);
    process.exit(1);
  }
}

start();