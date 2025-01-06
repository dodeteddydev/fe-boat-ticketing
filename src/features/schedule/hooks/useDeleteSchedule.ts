import { ErrorResponse } from "@/types/errorResponseType";
import { SuccessResponse } from "@/types/successResponseType";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ScheduleService } from "../services/scheduleService";

type UseDeleteScheduleOptions = UseMutationOptions<
  SuccessResponse<null>,
  ErrorResponse,
  number
>;

export const useDeleteSchedule = (options?: UseDeleteScheduleOptions) => {
  const scheduleService = new ScheduleService();

  return useMutation({
    mutationFn: (id: number) => scheduleService.delete(id),
    ...options,
  });
};
