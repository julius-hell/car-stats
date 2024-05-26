import {db} from "$lib/server/db";
import {eq} from "drizzle-orm";
import {userTable, carTable} from "$lib/server/schema";
import {zod} from "sveltekit-superforms/adapters";
import {settingsFormSchema} from "$lib/components/settingsForm/settingsFormSchema";
import {superValidate} from "sveltekit-superforms";
import type {Car} from "$lib/types/car";
import {fail, redirect} from "@sveltejs/kit";

export async function load({ locals }) {
    const userData = await db.query.userTable.findFirst({
        where: eq(userTable.id, locals.user!.id),
        columns: {
            username: true,
            primaryCar: true
        }
    });

    const cars = await db.query.carTable.findMany({
        where: eq(carTable.userId, locals.user!.id),
    })

    const formSchema = await superValidate(userData, zod(settingsFormSchema));

    return{
        formSchema,
        cars: cars as Car[]
    }
}

export const actions = {
    updateSettings: async (event) => {
        const form = await superValidate(event, zod(settingsFormSchema));
        if(!form.valid) {
            return fail(400, {
                form
            })
        }

        const { primaryCar } = form.data;

        await db.update(userTable).set({
            primaryCar
        }).where(eq(userTable.id, event.locals.user!.id));

        redirect(302, '/car')
    }
}
