import { SuccessResponse } from "@/types/successResponseType";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { PortResponse } from "../types/portResponse";
import { PortService } from "../services/portService";
import { ErrorResponse } from "@/types/errorResponseType";
import { PortPayload } from "../types/PortPayload";

type UseUpdatePortOptions = UseMutationOptions<
  SuccessResponse<PortResponse>,
  ErrorResponse,
  PortPayload
>;

export const useUpdatePort = (options?: UseUpdatePortOptions) => {
  const portService = new PortService();

  return useMutation({
    mutationFn: (payload: PortPayload) => portService.update(payload),
    ...options,
  });
};
