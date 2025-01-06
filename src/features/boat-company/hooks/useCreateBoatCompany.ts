import { SuccessResponse } from "@/types/successResponseType";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { BoatCompanyResponse } from "../types/boatCompanyResponse";
import { BoatCompanyPayload } from "../types/boatCompanyPayload";
import { BoatCompanyService } from "../services/boatCompanyService";
import { ErrorResponse } from "@/types/errorResponseType";

type UseCreateBoatCompanyOptions = UseMutationOptions<
  SuccessResponse<BoatCompanyResponse>,
  ErrorResponse,
  BoatCompanyPayload
>;

export const useCreateBoatCompany = (options?: UseCreateBoatCompanyOptions) => {
  const boatCompanyService = new BoatCompanyService();

  return useMutation({
    mutationFn: (payload: BoatCompanyPayload) =>
      boatCompanyService.create(payload),
    ...options,
  });
};
