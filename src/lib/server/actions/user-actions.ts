import {db, schema} from "$lib/server/db";
import {eq} from "drizzle-orm";
import {userTable} from "$lib/server/schema";

export async function getUserByGithubId(id: number) {
    return db.query.userTable.findFirst({
        where: eq(schema.userTable.githubId, id)
    });
}

export async function createGithubUser(id: string, githubId: number, username: string) {
    return db.insert(schema.userTable).values({
        id: id,
        githubId: githubId,
        username: username
    });
}

export async function getPrimaryCar(userId: string) {
    const result = await db.query.userTable.findFirst({
        where: eq(schema.userTable.id, userId),
        columns: {
            primaryCar: true,
        }
    });

    return result?.primaryCar ?? undefined;
}

export async function getUserSettings(userId: string) {
    return db.query.userTable.findFirst({
        where: eq(userTable.id, userId),
        columns: {
            primaryCar: true
        }
    });
}

export async function updatePrimaryCarSetting(userId: string, primaryCar: number | null) {
    await db.update(userTable).set({
        primaryCar
    }).where(eq(userTable.id, userId));
}
