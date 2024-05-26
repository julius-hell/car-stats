import {type Actions, fail, redirect} from "@sveltejs/kit";
import {superValidate} from "sveltekit-superforms";
import {zod} from "sveltekit-superforms/adapters";
import {formSchema} from "$lib/components/addMileageForm/formSchema";
import {addMileage, checkCarExists, getAllCars, getCarById} from "$lib/server/actions/car-actions";

export async function load({ locals, params }) {
    const cars = await getAllCars(locals.user!.id);

    if(cars.length === 0) {
        redirect(302, "/car/add");
    }

    const carId = parseInt(params.carId, 10);

    const selectedCar = await getCarById(carId, locals.user!.id);

    return {
        cars,
        selectedCar,
        addMileageFormData: await superValidate(zod(formSchema))

    }
}

export const actions: Actions = {
    addMileage: async (event) => {
        const carId = parseInt(event.params.carId!, 10);
        const form = await superValidate(event, zod(formSchema));

        if(!form.valid) {
            return fail(400, {
                form
            })
        }

        const userId = event.locals.user!.id

        const carExists = await checkCarExists(carId, userId);
        if(!carExists) {
            return fail(404);
        }

        await addMileage(carId, form.data.mileage);

        redirect(302, `/car/${carId}`);
    }
}
