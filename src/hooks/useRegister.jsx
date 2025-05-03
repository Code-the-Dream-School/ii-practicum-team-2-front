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
      setTokens({ access_token, refresh_token, user }); 
      const isNewUser = !user.resolutions?.length && !user.dailyQuests?.length;
      navigate(isNewUser ? '/new-resolutions' : '/dashboard');
      if (onSuccess) onSuccess();
    },
    onError: (err) => {
      console.error('Register error:', {
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
        'Validation failed';
      if (onError) onError(errorMessage);
    },
  });

  return { register, isLoading, error: error?.response?.data?.message || error?.message };
}