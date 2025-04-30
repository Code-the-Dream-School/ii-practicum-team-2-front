import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api, { setTokens } from '../util/auth';

export function useRegister({ onError, onSuccess } = {}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: register, isPending: isLoading, error } = useMutation({
    mutationFn: ({ email, password, password_confirmation, name }) =>
      api.post('/users/register', { email, password, password_confirmation, name }),
    onSuccess: (response) => {
      const { user, access_token, refresh_token } = response.data;
      console.log('Register success:', response.data);
      queryClient.setQueryData(['user'], user);
      setTokens({ access_token, refresh_token });
      navigate('/dashboard');
      if (onSuccess) onSuccess();
    },
    onError: (err) => {
      console.error('Register error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      if (onError) onError(err?.response?.data?.message || err?.message);
    },
  });

  return { register, isLoading, error: error?.response?.data?.message || error?.message };
}