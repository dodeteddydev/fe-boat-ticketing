import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const boatCompanySchema = z.object({
  id: z.number().optional(),
  companyName: z.string({ required_error: "Company name is required" }),
  companyLogo: z.instanceof(File).optional(),
});

export const boatCompanyValidationSchema =
  toFormikValidationSchema(boatCompanySchema);

type BoatCompanySchema = z.infer<typeof boatCompanySchema>;

export type BoatCompanyFormSchema = Partial<BoatCompanySchema>;
