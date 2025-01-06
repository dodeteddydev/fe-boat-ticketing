import { ErrorResponse } from "@/types/errorResponseType";
import { SuccessResponse } from "@/types/successResponseType";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthService } from "../services/authService";
import { SignInPayload } from "../types/signInPayloadType";
import { SignInResponse } from "../types/signInResponseType";

type UseSignInOptions = UseMutationOptions<
  SuccessResponse<SignInResponse>,
  ErrorResponse,
  SignInPayload
>;

export const useSignIn = (options?: UseSignInOptions) => {
  const authService = new AuthService();

  return useMutation({
    mutationFn: (payload: SignInPayload) => authService.signIn(payload),
    ...options,
  });
};
