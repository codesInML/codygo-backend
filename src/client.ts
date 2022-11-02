import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({
  log: [
    { level: "error", emit: "event" },
    { level: "query", emit: "event" },
  ],
  errorFormat: "pretty",
});

prismaClient.$on("error", (e) => console.log(e));

export const prisma = prismaClient;
