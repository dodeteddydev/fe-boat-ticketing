import { ErrorResponse } from "@/types/errorResponseType";
import { SuccessResponse } from "@/types/successResponseType";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { BoatCompanyService } from "../services/boatCompanyService";

type UseDeleteBoatCompanyOptions = UseMutationOptions<
  SuccessResponse<null>,
  ErrorResponse,
  number
>;

export const useDeleteBoatCompany = (options?: UseDeleteBoatCompanyOptions) => {
  const boatCompanyService = new BoatCompanyService();

  return useMutation({
    mutationFn: (id: number) => boatCompanyService.delete(id),
    ...options,
  });
};
