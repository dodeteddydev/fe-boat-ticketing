import { SuccessResponse } from "@/types/successResponseType";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ProfileResponse } from "../types/profileResponse";
import { ProfilePayload } from "../types/profilePayload";
import { ProfileService } from "../services/profileService";
import { ErrorResponse } from "@/types/errorResponseType";

type UseUpdateProfileOptions = UseMutationOptions<
  SuccessResponse<ProfileResponse>,
  ErrorResponse,
  ProfilePayload
>;

export const useUpdateProfile = (options?: UseUpdateProfileOptions) => {
  const profileServie = new ProfileService();

  return useMutation({
    mutationFn: (payload: ProfilePayload) => profileServie.update(payload),
    ...options,
  });
};
