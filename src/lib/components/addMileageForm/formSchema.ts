import {z} from "zod";

export const formSchema = z.object({
    mileage: z.coerce.number().gt(0).int(),
    includeLocation: z.boolean().default(false),
    latitude: z.number().nullish(),
    longitude: z.number().nullish(),
})
