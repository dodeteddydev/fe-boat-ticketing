import { ErrorResponse } from "@/types/errorResponseType";
import { SuccessResponseList } from "@/types/successResponseListType";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { BoatCompanyService } from "../services/boatCompanyService";
import { BoatCompanyParams } from "../types/boatCompanyParams";
import { BoatCompanyResponse } from "../types/boatCompanyResponse";
import { BOAT_COMPANY_QUERY_KEY } from "../constants/boatCompanyQueryKey";

type UseGetListBoatCompanyOptions = UseQueryOptions<
  SuccessResponseList<BoatCompanyResponse>,
  ErrorResponse
> & {
  params?: BoatCompanyParams;
};

export const useGetListBoatCompany = (
  options?: UseGetListBoatCompanyOptions
) => {
  const boatCompanyService = new BoatCompanyService();

  return useQuery<SuccessResponseList<BoatCompanyResponse>, ErrorResponse>({
    queryKey: BOAT_COMPANY_QUERY_KEY,
    queryFn: () => boatCompanyService.getList(options?.params),
    ...options,
  });
};
