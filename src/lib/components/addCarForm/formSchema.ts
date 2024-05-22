import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(1),
    make: z.string().min(1),
    model: z.string().min(1),
});
