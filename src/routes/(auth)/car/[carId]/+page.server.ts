import {db, schema} from "$lib/server/db";
import {and, desc, eq} from "drizzle-orm";
import {type Actions, fail, redirect} from "@sveltejs/kit";
import {superValidate} from "sveltekit-superforms";
import {zod} from "sveltekit-superforms/adapters";
import {formSchema} from "$lib/components/addMileageForm/formSchema";

export async function load({ locals, params }) {
    const cars = await db.query.carTable.findMany({
        where: eq(schema.carTable.userId, locals.user!.id)
    })

    if(cars.length === 0) {
        redirect(302, "/car/add");
    }

    const carId = parseInt(params.carId, 10);

    const selectedCar = await db.query.carTable.findFirst({
        where: and(
            eq(schema.carTable.userId, locals.user!.id),
            eq(schema.carTable.id, carId)
        ),
        with: {
            mileage: {
                orderBy: (mileage, { desc }) => [desc(mileage.created)],
                limit: 5
            }
        }
    })

    return {
        cars,
        selectedCar,
        addMileageFormData: await superValidate(zod(formSchema))

    }
}

export const actions: Actions = {
    addMileage: async (event) => {
        const carId = Number(event.params.carId);
        const form = await superValidate(event, zod(formSchema));

        if(!form.valid) {
            return fail(400, {
                form
            })
        }

        const userId = event.locals.user!.id

        const existingCar = await db.query.carTable.findFirst({
            where: and(
                eq(schema.carTable.id, carId),
                eq(schema.carTable.userId, userId)
            )
        });

        if(!existingCar) {
            return fail(404);
        }

        await db.insert(schema.mileageTable).values({
            carId,
            mileage: form.data.mileage
        })

        redirect(302, `/car/${carId}`);
    }
}
