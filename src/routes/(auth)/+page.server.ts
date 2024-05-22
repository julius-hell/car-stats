import {type Actions, fail, redirect} from "@sveltejs/kit";
import {db, schema} from "$lib/server/db";
import {and, eq} from "drizzle-orm";
import {superValidate} from "sveltekit-superforms";
import {zod} from "sveltekit-superforms/adapters";
import {formSchema} from "$lib/components/addMileageForm/formSchema";

export async function load({ locals, url }) {

    const cars = await db.query.carTable.findMany({
        where: eq(schema.carTable.userId, locals.user!.id)
    })

    if(cars.length === 0) {
        redirect(302, "/car/add");
    }

    const selectedCarId = parseInt(url.searchParams.get("car") ?? "", 10);


    let selectedCar = undefined;

    if(!isNaN(selectedCarId)) {
        selectedCar = await db.query.carTable.findFirst({
            where: and(
                eq(schema.carTable.userId, locals.user!.id),
                eq(schema.carTable.id, selectedCarId)
            ),
            with: {
                mileage: true,
            }
        });
    }

    return {
        cars,
        selectedCar,
        addMileageForm: await superValidate(zod(formSchema))
    };
}

export const actions: Actions = {
    addMileage: async (event) => {

        const form = await superValidate(event, zod(formSchema));
        console.log(form.data);
        if (!form.valid) {
            return fail(400, {
                form
            })
        }

        console.log(form.data);

        redirect(302, `/?car=${form.data.carId}`);
    }
}
