import { ErrorResponse } from "@/types/errorResponseType";
import { SuccessResponse } from "@/types/successResponseType";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { PortService } from "../services/portService";

type UseDeletePortOptions = UseMutationOptions<
  SuccessResponse<null>,
  ErrorResponse,
  number
>;

export const useDeletePort = (options?: UseDeletePortOptions) => {
  const portService = new PortService();

  return useMutation({
    mutationFn: (id: number) => portService.delete(id),
    ...options,
  });
};
