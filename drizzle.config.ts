import { defineConfig } from "drizzle-kit";
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    schema: "./src/lib/server/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        port: 5432,
        host: process.env.DB_HOST!.split(':')[0],
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_NAME!,
    },
    verbose: true,
    strict: true,
})
