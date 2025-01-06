import { DeepPartial } from "@/types/deepPartialType";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const boatSchema = z.object({
  id: z.number().optional(),
  boatName: z.string({ required_error: "Boat name is required" }),
  boatImage: z.instanceof(File).optional(),
  capacity: z.number({ required_error: "Capacity is required" }),
  boatCompany: z.object({
    id: z.number({ required_error: "Boat company is required" }),
    companyName: z.string().optional(),
  }),
});

export const boatValidationSchema = toFormikValidationSchema(boatSchema);

type BoatSchema = z.infer<typeof boatSchema>;

export type BoatFormSchema = DeepPartial<BoatSchema>;
