import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { clearTokens } from '../util/auth';

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      clearTokens(); // Remove tokens from localStorage
      queryClient.removeQueries(['user']); // Clear user data
      navigate('/signin'); // Navigate to login page
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return { logout };
}