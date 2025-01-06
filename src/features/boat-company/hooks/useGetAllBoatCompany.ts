import { ErrorResponse } from "@/types/errorResponseType";
import { SuccessResponse } from "@/types/successResponseType";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { BOAT_COMPANY_QUERY_KEY } from "../constants/boatCompanyQueryKey";
import { BoatCompanyService } from "../services/boatCompanyService";
import { BoatCompanyResponse } from "../types/boatCompanyResponse";

type UseGetAllBoatCompanyOptions = UseQueryOptions<
  SuccessResponse<BoatCompanyResponse[]>,
  ErrorResponse
>;

export const useGetAllBoatCompany = (options?: UseGetAllBoatCompanyOptions) => {
  const boatCompanyService = new BoatCompanyService();

  return useQuery<SuccessResponse<BoatCompanyResponse[]>, ErrorResponse>({
    queryKey: BOAT_COMPANY_QUERY_KEY.concat(["all"]),
    queryFn: () => boatCompanyService.getAll(),
    ...options,
  });
};
