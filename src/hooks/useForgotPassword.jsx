import { useMutation } from "@tanstack/react-query";
import api from "../util/auth";

export function useForgotPassword({ onSuccess, onError } = {}) {
    
  const {
    mutate: requestReset,
    isPending: isRequestLoading,
    error: requestError,
  } = useMutation({
    mutationFn: ({ email }) =>
      api.post("/users/password-reset/request", { email }), 
    onSuccess: (response) => {
      const message = response.data.message || "Reset link sent to your email.";
      if (onSuccess) onSuccess(message);
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0] ||
        err.message ||
        "Failed to send reset link";
      if (onError) onError(errorMessage);
    },
  });

  const {
    mutate: confirmReset,
    isPending: isConfirmLoading,
    error: confirmError,
  } = useMutation({
    mutationFn: ({ token, password }) =>
      api.post("/users/password-reset/confirm", { token, password }), 
    onSuccess: (response) => {
      const message = response.data.message || "Password reset successfully.";
      if (onSuccess) onSuccess(message);
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0] ||
        err.message ||
        "Failed to reset password";
      if (onError) onError(errorMessage);
    },
  });

  return {
    requestReset,
    isRequestLoading,
    requestError:
      requestError?.response?.data?.message || requestError?.message,
    confirmReset,
    isConfirmLoading,
    confirmError:
      confirmError?.response?.data?.message || confirmError?.message,
  };
}
