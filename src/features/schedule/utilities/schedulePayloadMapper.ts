import { ScheduleFormSchema } from "../schemas/scheduleSchema";
import { SchedulePayload } from "../types/SchedulePayload";

export const schedulePayloadMapper = (
  data: ScheduleFormSchema
): SchedulePayload => {
  return {
    id: data.id,
    dateSchedule: data?.dateSchedule ?? "",
    destinationId: data?.destination?.id ?? 0,
    departureId: data?.departure?.id ?? 0,
    boatId: data?.boat?.id ?? 0,
    price: data.price ?? 0,
    priceMarkup: data?.priceMarkup ?? 0,
  };
};
