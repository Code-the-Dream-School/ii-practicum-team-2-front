import { useMutation } from '@tanstack/react-query';
import api from '../util/auth';

export function useRefreshToken() {
  const { mutate: refreshToken, isPending: isLoading, error } = useMutation({
    mutationFn: () => {
      const refresh_token = api.getRefreshToken();
      return api.post('/users/refresh-token', { refresh_token });
    },
    onSuccess: (response) => {
      const { access_token, refresh_token } = response.data;
      api.setTokens({ access_token, refresh_token });
    },
    onError: (err) => {
      console.error('Refresh token error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      api.clearTokens();
      window.location.href = '/signin'; 
    },
  });

  return { refreshToken, isLoading, error: error?.response?.data?.message || error?.message };
}