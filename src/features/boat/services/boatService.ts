import { api } from "@/services/api";
import { SuccessResponseList } from "@/types/successResponseListType";
import { BoatParams } from "../types/boatParams";
import { BoatResponse } from "../types/boatResponse";
import { SuccessResponse } from "@/types/successResponseType";
import { BoatPayload } from "../types/boatPayload";

export class BoatService {
  async getList(params?: BoatParams) {
    return api
      .get<SuccessResponseList<BoatResponse>>("/boat/pages", {
        params,
      })
      .then((res) => res.data);
  }

  async getAll() {
    return api
      .get<SuccessResponse<BoatResponse[]>>("/boat")
      .then((res) => res.data);
  }

  async create(payload: BoatPayload) {
    const formData = new FormData();
    formData.append("boatName", payload.boatName);
    formData.append("boatImage", payload.boatImage!);
    formData.append("capacity", payload.capacity.toString());
    formData.append("boatCompanyId", payload.boatCompanyId.toString());

    return api.post("/boat", formData).then((res) => res.data);
  }

  async update(payload: BoatPayload) {
    const formData = new FormData();
    formData.append("boatName", payload.boatName);
    formData.append("boatImage", payload.boatImage!);
    formData.append("capacity", payload.capacity.toString());
    formData.append("boatCompanyId", payload.boatCompanyId.toString());

    return api.put(`/boat/${payload.id}`, formData).then((res) => res.data);
  }

  async delete(id: number) {
    return api.delete(`/boat/${id}`).then((res) => res.data);
  }
}
