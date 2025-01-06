import { SuccessResponse } from "@/types/successResponseType";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { PortResponse } from "../types/portResponse";
import { PortPayload } from "../types/portPayload";
import { PortService } from "../services/portService";
import { ErrorResponse } from "@/types/errorResponseType";

type UseCreatePortOptions = UseMutationOptions<
  SuccessResponse<PortResponse>,
  ErrorResponse,
  PortPayload
>;

export const useCreatePort = (options?: UseCreatePortOptions) => {
  const portService = new PortService();

  return useMutation({
    mutationFn: (payload: PortPayload) => portService.create(payload),
    ...options,
  });
};
