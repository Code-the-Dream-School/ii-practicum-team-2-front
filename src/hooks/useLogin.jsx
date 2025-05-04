import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api, { setTokens } from '../util/auth';

export function useLogin({ onError, onSuccess } = {}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading, error } = useMutation({
    mutationFn: ({ email, password }) =>
      api.post('/users/login', { email, password }),
    onSuccess: (response) => {
      const { user, access_token, refresh_token } = response.data;
      console.log('Login success:', response.data);
      queryClient.setQueryData(['user'], user);
      setTokens({ access_token, refresh_token, user }); 
      navigate('/daily-quests');
      if (onSuccess) onSuccess();
    },
    onError: (err) => {
      console.error('Login error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0] ||
        err.message ||
        'Login failed';
      if (onError) onError(errorMessage);
    },
  });

  return { login, isLoading, error: error?.response?.data?.message || error?.message };
}