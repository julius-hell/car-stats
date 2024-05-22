import {db, schema} from "$lib/server/db";
import {eq} from "drizzle-orm";
import {redirect} from "@sveltejs/kit";

export async function load({ locals }) {
    const cars = await db.query.carTable.findMany({
        where: eq(schema.carTable.userId, locals.user!.id)
    })

    if(cars.length === 0) {
        redirect(302, "/car/add");
    }

    return {
        cars
    }
}
