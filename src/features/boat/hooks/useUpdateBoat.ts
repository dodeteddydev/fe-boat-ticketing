import { SuccessResponse } from "@/types/successResponseType";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { BoatResponse } from "../types/boatResponse";
import { BoatPayload } from "../types/boatPayload";
import { BoatService } from "../services/boatService";
import { ErrorResponse } from "@/types/errorResponseType";

type UseUpdateBoatOptions = UseMutationOptions<
  SuccessResponse<BoatResponse>,
  ErrorResponse,
  BoatPayload
>;

export const useUpdateBoat = (options?: UseUpdateBoatOptions) => {
  const boatService = new BoatService();

  return useMutation({
    mutationFn: (payload: BoatPayload) => boatService.update(payload),
    ...options,
  });
};
