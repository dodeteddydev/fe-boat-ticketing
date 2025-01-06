export type SchedulePayload = {
  id?: number;
  dateSchedule: string;
  destinationId: number;
  departureId: number;
  boatId: number;
  price: number;
  priceMarkup: number;
};
