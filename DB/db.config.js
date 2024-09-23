import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"], // can be use ["query", "info", "warn", "error"] which will print on terminal
});

export default prisma;
