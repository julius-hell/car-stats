import {error, fail, redirect} from "@sveltejs/kit";
import {superValidate} from "sveltekit-superforms";
import {zod} from "sveltekit-superforms/adapters";
import {formSchema} from "$lib/components/addCarForm/formSchema";
import {getCarById, updateCar} from "$lib/server/actions/car-actions";

export async function load({ locals, params }) {
    const car = await getCarById(parseInt(params.carId, 10), locals.user!.id);
    if(!car) error(404, 'Car not found');

    const form = await superValidate(car, zod(formSchema));

    return {
        form
    }
}

export const actions = {
    updateCar: async (event) => {
        const form = await superValidate(event, zod(formSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        const { make, model, name } = form.data;
        const carId = parseInt(event.params.carId, 10);
        await updateCar(carId, event.locals.user!.id, { name, make, model });

        redirect(302, `/car/${carId}`);
    }
}
