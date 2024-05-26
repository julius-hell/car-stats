import {z } from "zod";

export const settingsFormSchema = z.object({
    primaryCar: z.coerce.number().gt(0).int().nullable()
})
