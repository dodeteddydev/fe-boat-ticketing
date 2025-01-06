import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const signInSchema = z.object({
  identifier: z.string({ required_error: "Email or username is required" }),
  password: z.string({ required_error: "Password is required" }),
});

export const signInValidationSchema = toFormikValidationSchema(signInSchema);

export type SignInSchema = z.infer<typeof signInSchema>;
