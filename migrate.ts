import 'dotenv/config';
import { migrate } from "drizzle-orm/node-postgres/migrator";

import pg from "pg";
import {drizzle} from "drizzle-orm/node-postgres";
import * as schema from "./src/lib/server/schema";

const client = new pg.Client({
    host: process.env.DB_HOST!.split(":")[0],
    port: 5432,
    user: process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

await client.connect();
const db = drizzle(client, { schema });

await migrate(db, { migrationsFolder: "./drizzle" });
await client.end();
