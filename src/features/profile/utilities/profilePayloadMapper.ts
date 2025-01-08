import { ProfileFormSchema } from "../schemas/profileSchema";
import { ProfilePayload } from "../types/profilePayload";

export const profilePayloadMapper = (
  data: ProfileFormSchema
): ProfilePayload => {
  return {
    username: data.username ?? "",
    email: data.email ?? "",
    password: data.password ?? "",
  };
};
