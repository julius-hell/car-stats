import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg"
import { env } from "$env/dynamic/private";
import * as importedSchema from "./schema";

export const schema = importedSchema;
export const client = new pg.Client({
    host: env.DB_HOST.split(":")[0],
    port: 5432,
    user: env.DB_USER,
    password : env.DB_PASSWORD,
    database: env.DB_NAME,
});

await client.connect();
export const db = drizzle(client, { schema });
