import {db} from "$lib/server/db";
import {and, eq} from "drizzle-orm";
import {carTable} from "$lib/server/schema";
import {error, fail, redirect} from "@sveltejs/kit";
import {superValidate} from "sveltekit-superforms";
import {zod} from "sveltekit-superforms/adapters";
import {formSchema} from "$lib/components/addCarForm/formSchema";
import type {Actions} from "../../../../../../.svelte-kit/types/src/routes/(auth)/car/add/$types";

export async function load({ locals, params }) {
    const car = await db.query.carTable.findFirst({
        where: and(
            eq(carTable.id, parseInt(params.carId, 10)),
            eq(carTable.userId, locals.user!.id)
        )
    });

    if(!car) error(404, 'Car not found');

    const form = await superValidate(car, zod(formSchema));

    return {
        form
    }
}

export const actions: Actions = {
    updateCar: async (event) => {
        const form = await superValidate(event, zod(formSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        const { make, model, name } = form.data;
        // @ts-expect-error carId exists in params
        const carId = event.params.carId;
        await db.update(carTable).set({
            name,
            model,
            make
        }).where(and(
            eq(carTable.id, parseInt(carId, 10)),
            eq(carTable.userId, event.locals.user!.id)
        ));

        redirect(302, `/car/${carId}`);
    }
}
