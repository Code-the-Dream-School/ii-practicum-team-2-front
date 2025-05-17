import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api, { setTokens } from "../util/auth";

export function useRegister({ onError, onSuccess } = {}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleRegistration = (data) => {
    const { user, access_token, refresh_token } = data;
    queryClient.setQueryData(["user"], user);
    setTokens({ access_token, refresh_token, user });

    const isNewUser = !user.resolutions?.length && !user.dailyQuests?.length;
    navigate(isNewUser ? "/new-resolutions" : "/dashboard");

    if (onSuccess) onSuccess();
  };

  const {
    mutate: register,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: ({ email, password, password_confirmation, name }) =>
      api.post("/users/register", {
        email,
        password,
        password_confirmation,
        name,
      }),
    onSuccess: (response) => {
      handleRegistration(response.data);
    },
    onError: (err) => {
      console.error("Register error:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0] ||
        err.response?.data?.errors?.email?.[0] ||
        err.response?.data?.errors?.password?.[0] ||
        err.message ||
        "Validation failed";
      if (onError) onError(errorMessage);
    },
  });

  const { mutate: googleRegister } = useMutation({
    mutationFn: async (idToken) => {
      const response = await api.post("/users/google-login", {
        id_token: idToken,
      });

      return response.data;
    },
    onSuccess: (data) => {
      handleRegistration(data);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  return {
    register,
    googleRegister,
    isLoading,
    error: error?.response?.data?.message || error?.message,
  };
}
