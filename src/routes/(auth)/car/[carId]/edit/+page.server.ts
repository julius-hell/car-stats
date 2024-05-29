import {error, fail, redirect} from "@sveltejs/kit";
import {superValidate} from "sveltekit-superforms";
import {zod} from "sveltekit-superforms/adapters";
import {formSchema} from "$lib/components/addCarForm/formSchema";
import {getCarById, updateCar, updateCarPicture} from "$lib/server/actions/car-actions";
import { extname, join } from "path";
import {v4 as uuid} from "uuid";
import { env } from "$env/dynamic/private";
import { Client as MinioClient } from "minio";
import {getMinioClient} from "$lib/server/get-minio-client";

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
    },
    updatePicture: async (event) => {
        const formData = Object.fromEntries(await event.request.formData());

        if (
            !(formData.picture as File).name ||
            (formData.picture as File).name === 'undefined'
        ) {
            return fail(400, {
                error: true,
                message: 'You must provide a file to upload'
            });
        }

        const { picture } = formData as { picture: File };

        const filename = `${uuid()}${extname(picture.name)}`;

        try {
            await updateCarPicture(parseInt(event.params.carId, 10), event.locals.user!.id, filename);
        } catch (error) {
            return fail(400, {
                error: true,
                message: 'Upload failed.'
            })
        }

        const minioClient = getMinioClient();

        await minioClient.putObject(env.PICTURES_BUCKET!, filename, Buffer.from(await picture.arrayBuffer()), picture.size);

        return {
            success: true,
        }
    }
}
