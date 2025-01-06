import { BoatCompanyFormSchema } from "../schemas/boatCompanySchema";
import { BoatCompanyPayload } from "../types/boatCompanyPayload";

export const boatCompanyPayloadMapper = (
  data: BoatCompanyFormSchema
): BoatCompanyPayload => {
  return {
    id: data.id,
    companyName: data?.companyName ?? "",
    companyLogo: data?.companyLogo,
  };
};
