import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { clearTokens } from "../util/auth";
import api from "../util/auth";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await api.post("/users/logout");
      toast.success(response.data.message || "Logged out successfully");
      clearTokens();
      queryClient.removeQueries(["user"]);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  return { logout };
}
