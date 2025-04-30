import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api, { setTokens } from '../util/auth';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading, error } = useMutation({
    mutationFn: ({ email, password }) =>
      api.post('/users/login', { email, password }),
    onSuccess: (response) => {
      const { user, access_token, refresh_token } = response.data;
      queryClient.setQueryData(['user'], user);
      setTokens({ access_token, refresh_token }); 
      navigate('/dashboard');
    },
    onError: (err) => {
      console.error('Login error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
    },
  });

  return { login, isLoading, error: error?.response?.data?.message || error?.message };
}