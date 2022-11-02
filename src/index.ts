import app from "./app";
import { prisma } from "./client";
import Logger from "./logger";
const PORT = process.env.PORT || 3000;

// start the express app
const start = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT must be defined");
  }
  try {
    await prisma.$connect();
    Logger.info("Connected to Database");

    app.listen(PORT, () => {
      Logger.info(`Server started on port ${PORT} 🔥🔥🔥`);
    });
  } catch (err) {
    Logger.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

start();
