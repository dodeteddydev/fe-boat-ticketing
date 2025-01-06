export type ScheduleResponse = {
  id: number;
  dateSchedule: string;
  price: number;
  priceMarkup: number;
  destination: {
    id: number;
    portName: string;
    portCode: string;
  };
  departure: {
    id: number;
    portName: string;
    portCode: string;
  };
  boat: {
    id: number;
    boatName: string;
  };
};
