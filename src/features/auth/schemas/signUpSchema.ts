import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const signUpSchema = z
  .object({
    username: z.string({ required_error: "Username is required" }),
    email: z.string({ required_error: "Email is required" }).email(),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string({
        required_error: "Confirm Password is required",
      })
      .min(6, "Password must be at least 6 characters"),
    role: z
      .enum(["USER", "SUPERADMIN", "BOATADMIN"])
      .default("BOATADMIN")
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signUpValidationSchema = toFormikValidationSchema(signUpSchema);

export type SignUpSchema = z.infer<typeof signUpSchema>;
