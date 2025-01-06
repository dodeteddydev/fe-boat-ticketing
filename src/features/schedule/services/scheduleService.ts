import { api } from "@/services/api";
import { SuccessResponseList } from "@/types/successResponseListType";
import { ScheduleParams } from "../types/scheduleParams";
import { SchedulePayload } from "../types/SchedulePayload";
import { ScheduleResponse } from "../types/scheduleResponse";

export class ScheduleService {
  async getList(params?: ScheduleParams) {
    return api
      .get<SuccessResponseList<ScheduleResponse>>("/schedule/pages", {
        params,
      })
      .then((res) => res.data);
  }

  async create(payload: SchedulePayload) {
    return api.post("/schedule", payload).then((res) => res.data);
  }

  async update(payload: SchedulePayload) {
    return api.put(`/schedule/${payload.id}`, payload).then((res) => res.data);
  }

  async delete(id: number) {
    return api.delete(`/schedule/${id}`).then((res) => res.data);
  }
}
