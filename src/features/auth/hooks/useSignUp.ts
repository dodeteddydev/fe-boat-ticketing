import { ErrorResponse } from "@/types/errorResponseType";
import { SuccessResponse } from "@/types/successResponseType";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthService } from "../services/authService";
import { SignUpPayload } from "../types/signUpPayloadType";
import { SignUpResponse } from "../types/signUpResponseType";

type UseSignUpOptions = UseMutationOptions<
  SuccessResponse<SignUpResponse>,
  ErrorResponse,
  SignUpPayload
>;

export const useSignUp = (options?: UseSignUpOptions) => {
  const authService = new AuthService();

  return useMutation({
    mutationFn: (payload: SignUpPayload) => authService.signUp(payload),
    ...options,
  });
};
