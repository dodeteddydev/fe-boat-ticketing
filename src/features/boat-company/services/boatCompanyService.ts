import { api } from "@/services/api";
import { SuccessResponseList } from "@/types/successResponseListType";
import { BoatCompanyParams } from "../types/boatCompanyParams";
import { BoatCompanyPayload } from "../types/boatCompanyPayload";
import { BoatCompanyResponse } from "../types/boatCompanyResponse";
import { SuccessResponse } from "@/types/successResponseType";

export class BoatCompanyService {
  async getList(params?: BoatCompanyParams) {
    return api
      .get<SuccessResponseList<BoatCompanyResponse>>("/boat-company/pages", {
        params,
      })
      .then((res) => res.data);
  }

  async getAll() {
    return api
      .get<SuccessResponse<BoatCompanyResponse[]>>("/boat-company")
      .then((res) => res.data);
  }

  async create(payload: BoatCompanyPayload) {
    const formData = new FormData();
    formData.append("companyName", payload.companyName);
    formData.append("companyLogo", payload.companyLogo!);

    return api.post("/boat-company", formData).then((res) => res.data);
  }

  async update(payload: BoatCompanyPayload) {
    const formData = new FormData();
    formData.append("companyName", payload.companyName);
    formData.append("companyLogo", payload.companyLogo!);

    return api
      .put(`/boat-company/${payload.id}`, formData)
      .then((res) => res.data);
  }

  async delete(id: number) {
    return api.delete(`/boat-company/${id}`).then((res) => res.data);
  }
}
