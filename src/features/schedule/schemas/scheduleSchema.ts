import { DeepPartial } from "@/types/deepPartialType";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const scheduleSchema = z.object({
  id: z.number().optional(),
  dateSchedule: z.string({ required_error: "Date is required" }),
  price: z.number({ required_error: "Price is required" }),
  priceMarkup: z.number().optional(),
  destination: z.object({
    id: z.number({ required_error: "Destination is required" }),
    portName: z.string().optional(),
    portCode: z.string().optional(),
  }),
  departure: z.object({
    id: z.number({ required_error: "Departure is required" }),
    portName: z.string().optional(),
    portCode: z.string().optional(),
  }),
  boat: z.object({
    id: z.number({ required_error: "Boat is required" }),
    boatName: z.string().optional(),
  }),
});

export const scheduleValidationSchema =
  toFormikValidationSchema(scheduleSchema);

type ScheduleSchema = z.infer<typeof scheduleSchema>;

export type ScheduleFormSchema = DeepPartial<ScheduleSchema>;
