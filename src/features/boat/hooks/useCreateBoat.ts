import { SuccessResponse } from "@/types/successResponseType";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { BoatResponse } from "../types/boatResponse";
import { BoatPayload } from "../types/boatPayload";
import { BoatService } from "../services/boatService";
import { ErrorResponse } from "@/types/errorResponseType";

type UseCreateBoatOptions = UseMutationOptions<
  SuccessResponse<BoatResponse>,
  ErrorResponse,
  BoatPayload
>;

export const useCreateBoat = (options?: UseCreateBoatOptions) => {
  const boatService = new BoatService();

  return useMutation({
    mutationFn: (payload: BoatPayload) => boatService.create(payload),
    ...options,
  });
};
