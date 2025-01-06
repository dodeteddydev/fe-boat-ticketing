import { SuccessResponse } from "@/types/successResponseType";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { BoatCompanyResponse } from "../types/boatCompanyResponse";
import { BoatCompanyPayload } from "../types/boatCompanyPayload";
import { BoatCompanyService } from "../services/boatCompanyService";
import { ErrorResponse } from "@/types/errorResponseType";

type UseUpdateBoatCompanyOptions = UseMutationOptions<
  SuccessResponse<BoatCompanyResponse>,
  ErrorResponse,
  BoatCompanyPayload
>;

export const useUpdateBoatCompany = (options?: UseUpdateBoatCompanyOptions) => {
  const boatCompanyService = new BoatCompanyService();

  return useMutation({
    mutationFn: (payload: BoatCompanyPayload) =>
      boatCompanyService.update(payload),
    ...options,
  });
};
