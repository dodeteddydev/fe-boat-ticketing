import { ErrorResponse } from "@/types/errorResponseType";
import { SuccessResponseList } from "@/types/successResponseListType";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { PortService } from "../services/portService";
import { PortParams } from "../types/portParams";
import { PortResponse } from "../types/portResponse";
import { PORT_QUERY_KEY } from "../constants/portQueryKey";

type UseGetListPortOptions = UseQueryOptions<
  SuccessResponseList<PortResponse>,
  ErrorResponse
> & {
  params?: PortParams;
};

export const useGetListPort = (options?: UseGetListPortOptions) => {
  const portService = new PortService();

  return useQuery<SuccessResponseList<PortResponse>, ErrorResponse>({
    queryKey: PORT_QUERY_KEY,
    queryFn: () => portService.getList(options?.params),
    ...options,
  });
};
