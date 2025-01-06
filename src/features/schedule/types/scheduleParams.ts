import { ParamsType } from "@/types/paramsType";

export type ScheduleParams = ParamsType & {
  dateSchedule?: string;
  destinationId?: number;
  departureId?: number;
  boatId?: number;
};
