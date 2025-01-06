import { ErrorResponse } from "@/types/errorResponseType";
import { SuccessResponse } from "@/types/successResponseType";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { BOAT_QUERY_KEY } from "../constants/boatQueryKey";
import { BoatResponse } from "../types/boatResponse";
import { BoatService } from "../services/boatService";

type UseGetAllBoatOptions = UseQueryOptions<
  SuccessResponse<BoatResponse[]>,
  ErrorResponse
>;

export const useGetAllBoat = (options?: UseGetAllBoatOptions) => {
  const boatService = new BoatService();

  return useQuery<SuccessResponse<BoatResponse[]>, ErrorResponse>({
    queryKey: BOAT_QUERY_KEY.concat(["all"]),
    queryFn: () => boatService.getAll(),
    ...options,
  });
};
