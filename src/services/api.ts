import { SuccessResponse } from "@/types/successResponseType";
import axios, { AxiosError } from "axios";
import { LocalStorageHelpers } from "@/utilities/localStorageHelpers";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      config.headers["Accept"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
      config.headers["Accept"] = "application/json";
    }
    config.headers["X-Client-Type"] = "web";

    if (LocalStorageHelpers.accessToken) {
      config.headers.Authorization = `Bearer ${LocalStorageHelpers.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const isSignInRequest = error.config?.url?.includes("/auth/signin");
    const isSignUpRequest = error.config?.url?.includes("/auth/signup");

    if (
      error.response?.status === 401 &&
      !isSignInRequest &&
      !isSignUpRequest
    ) {
      try {
        const refreshToken = await axios
          .post<SuccessResponse<{ accessToken: string }>>(
            `${baseUrl}/auth/refresh-token`,
            {},
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Client-Type": "web",
              },
            }
          )
          .then((response) => response.data);

        const sessionStorage = LocalStorageHelpers.getSession();

        LocalStorageHelpers.setSession({
          newAccessToken: refreshToken.data.accessToken,
          role: sessionStorage?.split("|")[0],
        });
      } catch (error) {
        LocalStorageHelpers.removeSession();

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
