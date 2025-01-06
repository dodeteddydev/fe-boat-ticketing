import { DeepPartial } from "@/types/deepPartialType";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const portSchema = z.object({
  id: z.number().optional(),
  portName: z.string({ required_error: "Port name is required" }),
  portCode: z.string({ required_error: "Port Code is required" }),
});

export const portValidationSchema = toFormikValidationSchema(portSchema);

type PortSchema = z.infer<typeof portSchema>;

export type PortFormSchema = DeepPartial<PortSchema>;
