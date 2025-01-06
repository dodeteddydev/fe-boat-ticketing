import { ErrorResponse } from "@/types/errorResponseType";
import { SuccessResponse } from "@/types/successResponseType";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthService } from "../services/authService";

type UseSignOutOptions = UseMutationOptions<
  SuccessResponse<null>,
  ErrorResponse
>;

export const useSignOut = (options?: UseSignOutOptions) => {
  const authService = new AuthService();

  return useMutation({
    mutationFn: () => authService.SignOut(),
    ...options,
  });
};
