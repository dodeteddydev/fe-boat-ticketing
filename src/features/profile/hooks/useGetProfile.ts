import { ErrorResponse } from "@/types/errorResponseType";
import { SuccessResponse } from "@/types/successResponseType";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ProfileService } from "../services/profileService";
import { ProfileResponse } from "../types/profileResponse";
import { PROFILE_QUERY_KEY } from "../constants/profileQueryKey";

type UseGetProfileOptions = UseQueryOptions<
  SuccessResponse<ProfileResponse>,
  ErrorResponse
>;

export const useGetProfile = (options?: UseGetProfileOptions) => {
  const profileService = new ProfileService();

  return useQuery<SuccessResponse<ProfileResponse>, ErrorResponse>({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: () => profileService.get(),
    ...options,
  });
};
