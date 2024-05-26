import {type Actions, fail, redirect} from "@sveltejs/kit";
import {superValidate} from "sveltekit-superforms";
import {zod} from "sveltekit-superforms/adapters";
import {formSchema} from "$lib/components/addMileageForm/formSchema";
import {addMileage, checkCarExists, getAllCars, getCarById} from "$lib/server/actions/car-actions";
import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { ApiKeyCredentials } from "@azure/ms-rest-js";
import { env } from "$env/dynamic/private";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

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
    },
    addOcrMileage: async (event) => {
        const key = env.VISION_KEY!;
        const endpoint = env.VISION_ENDPOINT!;
        console.log('key', key);
        console.log('endpoint', endpoint);
        const formData = Object.fromEntries(await event.request.formData());
        console.log(formData);
        const { picture } = formData as { picture: File };

        const apiKey = new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key} });
        const client = new ComputerVisionClient(apiKey, endpoint);

        const result  = await client.readInStream(Buffer.from(await picture.arrayBuffer()));
        const operation = result.operationLocation.split('/').slice(-1)[0];
        let response = await client.getReadResult(operation);
        while (response.status !== "succeeded") {
            await sleep(500);
            response = await client.getReadResult(operation);
        }
        const readResults = response.analyzeResult?.readResults!;
        for (const page in readResults) {
            if (readResults.length > 1) {
                console.log(`==== Page: ${page}`);
            }
            const result = readResults[page];
            if (result.lines.length) {
                for (const line of result.lines) {
                    console.log(line.words.map(w => w.text).join(' '));
                }
            }
            else { console.log('No recognized text.'); }
        }
        console.log('ok');
    }
}
