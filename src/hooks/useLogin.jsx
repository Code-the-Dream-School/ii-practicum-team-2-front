import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api, { setTokens } from "../util/auth";
import toast from "react-hot-toast";
export function useLogin({ onError, onSuccess } = {}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    const { user, access_token, refresh_token } = data;
      const stored = setTokens({ access_token, refresh_token, user });
      if (!stored) {
        throw new Error("Failed to store authentication data");
      }
      queryClient.setQueryData(["user"], user);
      toast.success("Logged in successfully!");
      if (onSuccess) onSuccess();
      navigate("/daily-quests");
  }

  const {
    mutate: login,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await api.post("/users/login", { email, password });
      return response.data;
    },
    onSuccess: (data) => {
      handleLogin(data);
    },
    onError: (err) => {
      console.error("Login error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0] ||
        err.message ||
        "Login failed";
      toast.error(errorMessage);
      if (onError) onError(errorMessage);
    },
  });

  const { mutate: googleLogin } = useMutation({
    mutationFn: async (idToken) => {
      const response = await api.post("/users/google-login", {
        id_token: idToken,
      });

      return response.data;
    },
    onSuccess: (data) => {
      handleLogin(data);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });


  return {
    login,
    googleLogin,
    isLoading,
    error: error?.response?.data?.message || error?.message,
  };
}
