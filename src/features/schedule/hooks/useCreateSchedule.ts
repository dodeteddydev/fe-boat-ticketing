import { SuccessResponse } from "@/types/successResponseType";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ScheduleResponse } from "../types/scheduleResponse";
import { SchedulePayload } from "../types/SchedulePayload";
import { ScheduleService } from "../services/scheduleService";
import { ErrorResponse } from "@/types/errorResponseType";

type UseCreateScheduleOptions = UseMutationOptions<
  SuccessResponse<ScheduleResponse>,
  ErrorResponse,
  SchedulePayload
>;

export const useCreateSchedule = (options?: UseCreateScheduleOptions) => {
  const scheduleService = new ScheduleService();

  return useMutation({
    mutationFn: (payload: SchedulePayload) => scheduleService.create(payload),
    ...options,
  });
};
