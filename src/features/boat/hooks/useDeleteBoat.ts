import { ErrorResponse } from "@/types/errorResponseType";
import { SuccessResponse } from "@/types/successResponseType";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { BoatService } from "../services/boatService";

type UseDeleteBoatOptions = UseMutationOptions<
  SuccessResponse<null>,
  ErrorResponse,
  number
>;

export const useDeleteBoat = (options?: UseDeleteBoatOptions) => {
  const boatService = new BoatService();

  return useMutation({
    mutationFn: (id: number) => boatService.delete(id),
    ...options,
  });
};
