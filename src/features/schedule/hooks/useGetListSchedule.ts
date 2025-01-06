import { ErrorResponse } from "@/types/errorResponseType";
import { SuccessResponseList } from "@/types/successResponseListType";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ScheduleService } from "../services/scheduleService";
import { ScheduleParams } from "../types/scheduleParams";
import { ScheduleResponse } from "../types/scheduleResponse";
import { SCHEDULE_QUERY_KEY } from "../constants/scheduleQueryKey";

type UseGetListScheduleOptions = UseQueryOptions<
  SuccessResponseList<ScheduleResponse>,
  ErrorResponse
> & {
  params?: ScheduleParams;
};

export const useGetListSchedule = (options?: UseGetListScheduleOptions) => {
  const scheduleService = new ScheduleService();

  return useQuery<SuccessResponseList<ScheduleResponse>, ErrorResponse>({
    queryKey: SCHEDULE_QUERY_KEY,
    queryFn: () => scheduleService.getList(options?.params),
    ...options,
  });
};
