import { api } from "@/services/api";
import { SignUpPayload } from "../types/signUpPayloadType";
import { SignInPayload } from "../types/signInPayloadType";

export class AuthService {
  async signUp(payload: SignUpPayload) {
    return await api.post("/auth/signup", payload).then((res) => res.data);
  }
  async signIn(payload: SignInPayload) {
    return await api.post("/auth/signin", payload).then((res) => res.data);
  }
  async SignOut() {
    return await api.post("/auth/signout").then((res) => res.data);
  }
}
