import {zod} from "sveltekit-superforms/adapters";
import {settingsFormSchema} from "$lib/components/settingsForm/settingsFormSchema";
import {superValidate} from "sveltekit-superforms";
import {type Actions, fail, redirect} from "@sveltejs/kit";
import {lucia} from "$lib/server/auth";
import {getAllCars} from "$lib/server/actions/car-actions";
import {getUserSettings, updatePrimaryCarSetting} from "$lib/server/actions/user-actions";

export async function load({ locals }) {
    const userData = await getUserSettings(locals.user!.id);
    const cars = await getAllCars(locals.user!.id);

    const formSchema = await superValidate(userData, zod(settingsFormSchema));

    return{
        formSchema,
        cars
    }
}

export const actions: Actions = {
    updateSettings: async (event) => {
        const form = await superValidate(event, zod(settingsFormSchema));
        if(!form.valid) {
            return fail(400, {
                form
            })
        }

        await updatePrimaryCarSetting(event.locals.user!.id, form.data.primaryCar);
        redirect(302, '/car')
    },
    logout: async (event) => {
        if(!event.locals.session) {
            return fail(401);
        }

        await lucia.invalidateSession(event.locals.session.id);
        const sessionCookie = lucia.createBlankSessionCookie();
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });
        redirect(302, "/login");
    }
}
