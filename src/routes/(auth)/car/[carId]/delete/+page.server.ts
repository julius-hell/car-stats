import {getCarById, deleteCar} from "$lib/server/actions/car-actions";
import {error, redirect} from "@sveltejs/kit";

export async function load({ locals, params }) {
    const car = await getCarById(parseInt(params.carId, 10), locals.user!.id);
    if(!car) error(404, 'Car not found');

    return {
        car
    }
}

export const actions = {
    default: async (event) => {
        const carId = parseInt(event.params.carId!, 10);

        await deleteCar(carId, event.locals.user!.id);
        redirect(302, '/car');
    }
}
