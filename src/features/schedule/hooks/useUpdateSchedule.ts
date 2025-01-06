import { SuccessResponse } from "@/types/successResponseType";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ScheduleResponse } from "../types/scheduleResponse";
import { SchedulePayload } from "../types/SchedulePayload";
import { ScheduleService } from "../services/scheduleService";
import { ErrorResponse } from "@/types/errorResponseType";

type UseUpdateScheduleOptions = UseMutationOptions<
  SuccessResponse<ScheduleResponse>,
  ErrorResponse,
  SchedulePayload
>;

export const useUpdateSchedule = (options?: UseUpdateScheduleOptions) => {
  const scheduleService = new ScheduleService();

  return useMutation({
    mutationFn: (payload: SchedulePayload) => scheduleService.update(payload),
    ...options,
  });
};
