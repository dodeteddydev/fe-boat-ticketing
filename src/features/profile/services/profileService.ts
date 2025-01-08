import { api } from "@/services/api";
import { SuccessResponse } from "@/types/successResponseType";
import { ProfileResponse } from "../types/profileResponse";
import { ProfileFormSchema } from "../schemas/profileSchema";

export class ProfileService {
  async get() {
    return api
      .get<SuccessResponse<ProfileResponse>>("/user")
      .then((res) => res.data);
  }

  async update(payload: ProfileFormSchema) {
    return await api.put("/user", payload).then((res) => res.data);
  }
}
