// This file will contain the api call to refresh the token and set it in local storage
import { useMutation } from "@tanstack/react-query";
import api from "../util/auth";

export function useRefreshToken() {
  const {
    mutateAsync: refreshToken,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: () => {
      const refresh_token = api.getRefreshToken();
      return api.post("/users/refresh-token", { refresh_token });
    },
    onSuccess: (response) => {
      const { access_token, refresh_token } = response.data;
      console.log("Refreshed tokens:", { access_token, refresh_token });
      api.setTokens({ access_token, refresh_token });
    },
    onError: (err) => {
      console.error("Refresh token error:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      api.clearTokens();
      window.location.href = "/signin";
    },
  });

  return {
    refreshToken,
    isLoading,
    error: error?.response?.data?.message || error?.message,
  };
}

// This function will be used to fetch data from the API with the access token and refresh it if needed
export const fetchWithAuth = async (url, refreshToken, options = {}) => {
  let token = localStorage.getItem("access_token");

  const fetchWithToken = async (token) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  };

  let response = await fetchWithToken(token);

  // If the response is 401 (Unauthorized), refreshes the token
  if (response.status === 401) {
    await refreshToken();
    token = localStorage.getItem("access_token");
    response = await fetchWithToken(token);
  }

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Fetch goal types from the API
export const fetchGoalTypes = async () => {
  try {
    const response = await api.get(
      "/goal-types?limit=10&sort=id",
      useRefreshToken
    );
    return response.data.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to fetch goal types."
    );
  }
};
