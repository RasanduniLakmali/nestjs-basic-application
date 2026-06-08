import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  // This handles migrations and CLI commands
  datasource: {
    url: process.env.DATABASE_URL,
  },
});