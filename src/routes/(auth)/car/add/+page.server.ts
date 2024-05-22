import type {Actions, PageServerLoad} from "./$types";
import { superValidate } from "sveltekit-superforms";
import { formSchema} from "$lib/components/addCarForm/formSchema";
import { zod} from "sveltekit-superforms/adapters";
import {fail, redirect} from "@sveltejs/kit";
import {db, schema} from "$lib/server/db";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(formSchema))
    }
}

export const actions: Actions = {
    addCar: async (event) => {
        const form = await superValidate(event, zod(formSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        const { make, model, name } = form.data;

        await db.insert(schema.carTable).values({
            make,
            model,
            name,
            userId: event.locals.user!.id!
        });

        throw redirect(302, "/")
    }
}
