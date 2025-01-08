import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const profileSchema = z.object({
  id: z.number().optional(),
  username: z.string({ required_error: "Usernam is required" }),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

export const profileValidationSchema = toFormikValidationSchema(profileSchema);

type ProfileSchema = z.infer<typeof profileSchema>;

export type ProfileFormSchema = Partial<ProfileSchema>;
