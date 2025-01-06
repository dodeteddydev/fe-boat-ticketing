import { SignInSchema } from "../schemas/signInSchema";
import { SignInPayload } from "../types/signInPayloadType";

export const signInPayloadMapper = (data: SignInSchema): SignInPayload => {
  return {
    identifier: data.identifier,
    password: data.password,
  };
};
