import { SignUpSchema } from "../schemas/signUpSchema";
import { SignUpPayload } from "../types/signUpPayloadType";

export const signUpPayloadMapper = (data: SignUpSchema): SignUpPayload => {
  return {
    username: data.username,
    email: data.email,
    password: data.password,
    role: data.role ?? "BOATADMIN",
  };
};
