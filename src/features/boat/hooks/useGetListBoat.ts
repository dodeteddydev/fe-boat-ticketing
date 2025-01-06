import { ErrorResponse } from "@/types/errorResponseType";
import { SuccessResponseList } from "@/types/successResponseListType";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { BoatService } from "../services/boatService";
import { BoatParams } from "../types/boatParams";
import { BoatResponse } from "../types/boatResponse";
import { BOAT_QUERY_KEY } from "../constants/boatQueryKey";

type UseGetListBoatOptions = UseQueryOptions<
  SuccessResponseList<BoatResponse>,
  ErrorResponse
> & {
  params?: BoatParams;
};

export const useGetListBoat = (options?: UseGetListBoatOptions) => {
  const boatService = new BoatService();

  return useQuery<SuccessResponseList<BoatResponse>, ErrorResponse>({
    queryKey: BOAT_QUERY_KEY,
    queryFn: () => boatService.getList(options?.params),
    ...options,
  });
};
