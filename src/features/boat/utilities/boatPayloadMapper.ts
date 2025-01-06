import { BoatFormSchema } from "../schemas/boatSchema";
import { BoatPayload } from "../types/BoatPayload";

export const boatPayloadMapper = (data: BoatFormSchema): BoatPayload => {
  return {
    id: data.id,
    boatName: data?.boatName ?? "",
    boatImage: data?.boatImage,
    capacity: data?.capacity ?? 0,
    boatCompanyId: data?.boatCompany?.id ?? 0,
  };
};
