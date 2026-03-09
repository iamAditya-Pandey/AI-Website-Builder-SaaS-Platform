/* * Author: Aditya Pandey 
 * GitHub: https://github.com/iamAditya-Pandey 
 * Description: Core Prisma configuration file for runtime and migrations. 
 */
// npm install --save-dev prisma dotenv
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});