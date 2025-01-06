import { api } from "@/services/api";
import { SuccessResponseList } from "@/types/successResponseListType";
import { PortParams } from "../types/portParams";
import { PortPayload } from "../types/PortPayload";
import { PortResponse } from "../types/portResponse";
import { SuccessResponse } from "@/types/successResponseType";

export class PortService {
  async getList(params?: PortParams) {
    return api
      .get<SuccessResponseList<PortResponse>>("/port/pages", {
        params,
      })
      .then((res) => res.data);
  }

  async getAll() {
    return api
      .get<SuccessResponse<PortResponse[]>>("/port")
      .then((res) => res.data);
  }

  async create(payload: PortPayload) {
    return api.post("/port", payload).then((res) => res.data);
  }

  async update(payload: PortPayload) {
    return api.put(`/port/${payload.id}`, payload).then((res) => res.data);
  }

  async delete(id: number) {
    return api.delete(`/port/${id}`).then((res) => res.data);
  }
}
