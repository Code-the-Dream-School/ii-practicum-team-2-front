import { useQuery } from "@tanstack/react-query";
import api from "../util/auth";
export function useSuggestions() {
  const {
    data: suggestions,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["suggestions"],
    queryFn: async () => {
      const response = await api.get("/daily-quests/suggestions");
      return response.data.data;
    },
  });
  return {
    suggestions: suggestions || [],
    isLoading,
    error,
    refetch,
  };
}
