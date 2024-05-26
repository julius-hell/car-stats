import {db, schema} from "$lib/server/db";
import {eq} from "drizzle-orm";
import {redirect} from "@sveltejs/kit";

export async function load({ locals }) {

    const primaryCarResult = await db.query.userTable.findFirst({
        where: eq(schema.userTable.id, locals.user!.id),
        columns: {
            primaryCar: true,
        }
    });
    
    if(primaryCarResult && primaryCarResult.primaryCar) {
        redirect(302, `/car/${primaryCarResult.primaryCar}`);
    }

    const cars = await db.query.carTable.findMany({
        where: eq(schema.carTable.userId, locals.user!.id)
    })



    if(cars.length === 0) {
        redirect(302, "/car/add");
    } else if (cars.length === 1) {
        redirect(302, `/car/${cars[0].id}`);
    }

    return {
        cars
    }
}
