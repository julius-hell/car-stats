import {z} from "zod";

export const formSchema = z.object({
    mileage: z.coerce.number().gt(0).int(),
})
