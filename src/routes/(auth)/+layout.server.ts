import { redirect } from "@sveltejs/kit";

export async function load(event) {
    if(!event.locals.user) {
        throw redirect(302, `/login`);
    }

    return {}
}
