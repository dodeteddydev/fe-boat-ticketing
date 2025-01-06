import { ErrorResponse } from "@/types/errorResponseType";
import { SuccessResponse } from "@/types/successResponseType";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { PORT_QUERY_KEY } from "../constants/portQueryKey";
import { PortResponse } from "../types/portResponse";
import { PortService } from "../services/portService";

type UseGetAllPortOptions = UseQueryOptions<
  SuccessResponse<PortResponse[]>,
  ErrorResponse
>;

export const useGetAllPort = (options?: UseGetAllPortOptions) => {
  const portService = new PortService();

  return useQuery<SuccessResponse<PortResponse[]>, ErrorResponse>({
    queryKey: PORT_QUERY_KEY.concat(["all"]),
    queryFn: () => portService.getAll(),
    ...options,
  });
};
