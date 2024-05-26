import {redirect} from "@sveltejs/kit";
import { getPrimaryCar } from "$lib/server/actions/user-actions";
import {getAllCars} from "$lib/server/actions/car-actions";

export async function load({ locals }) {

    const primaryCar = await getPrimaryCar(locals.user!.id);
    if(primaryCar) {
        redirect(302, `/car/${primaryCar}`);
    }

    const cars = await getAllCars(locals.user!.id);



    if(cars.length === 0) {
        redirect(302, "/car/add");
    } else if (cars.length === 1) {
        redirect(302, `/car/${cars[0].id}`);
    }

    return {
        cars
    }
}
