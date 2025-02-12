import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

export const useAuth = () => {
  const url = import.meta.env.VITE_API_BASE_URL

  const setAuth = useAuthStore((state) => state.setAuth);

  const login = async (name: string, email: string) => {
    try {
      const response = await axios.post(
        `${url}/auth/login`,
        { name, email },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setAuth({ name, email });
        return true;
      }
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  return { login };
};
