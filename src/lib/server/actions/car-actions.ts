import {db, schema} from "$lib/server/db";
import {and, eq} from "drizzle-orm";
import type {Car} from "$lib/types/car";
import {carTable} from "$lib/server/schema";

export async function getAllCars(userId: string) {
    const cars = await db.query.carTable.findMany({
        where: eq(schema.carTable.userId, userId)
    });

    return cars as Car[];
}

export async function getCarById(carId: number, userId: string) {
    const car =  await db.query.carTable.findFirst({
        where: and(
            eq(schema.carTable.userId, userId),
            eq(schema.carTable.id, carId)
        ),
        with: {
            mileage: {
                orderBy: (mileage, { desc }) => [desc(mileage.created)],
                limit: 5
            }
        }
    });

    return car as Car;
}

export async function checkCarExists(carId: number, userId: string) {
    const car = await db.query.carTable.findFirst({
        where: and(
            eq(schema.carTable.userId, userId),
            eq(schema.carTable.id, carId)
        )
    });

    return car !== undefined;
}

export async function addMileage(carId: number, mileage: number) {
    await db.insert(schema.mileageTable).values({
        carId,
        mileage
    })
}

export interface CarParams {
    name: string,
    model: string,
    make: string
}

export async function updateCar(carId: number, userId: string, params: CarParams): Promise<void> {
    await db.update(carTable).set(params)
        .where(and(
            eq(carTable.id, carId),
            eq(carTable.userId, userId)
        ));
}

export async function createCar(userId: string, params: CarParams): Promise<void> {
    await db.insert(schema.carTable).values({
        ...params,
        userId
    });
}
