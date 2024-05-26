import type {Actions, PageServerLoad} from "./$types";
import { superValidate } from "sveltekit-superforms";
import { formSchema} from "$lib/components/addCarForm/formSchema";
import { zod} from "sveltekit-superforms/adapters";
import {fail, redirect} from "@sveltejs/kit";
import {createCar} from "$lib/server/actions/car-actions";

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

        await createCar(event.locals.user!.id, form.data);
        throw redirect(302, "/")
    }
}
