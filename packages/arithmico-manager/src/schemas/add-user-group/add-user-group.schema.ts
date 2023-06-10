import { z } from "zod";

export const addUserGroupSchema = z.object({
  name: z
    .string({ required_error: "common.form.errors.required" })
    .min(1, "common.form.errors.required")
    .refine((arg) => !arg.includes(" "), "common.form.errors.no-whitespace"),
});

export type AddUserGroupSchemaType = z.infer<typeof addUserGroupSchema>;
