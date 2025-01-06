export type BoatResponse = {
  id: number;
  boatName: string;
  boatImage: string;
  capacity: number;
  boatCompany: {
    id: number;
    companyName: string;
  };
};
