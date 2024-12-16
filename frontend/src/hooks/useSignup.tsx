import { useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
import axios from "axios";

interface User {
  _id: string;
  email: string;
}

interface UseSignupResult {
  userr: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useSignup = (): UseSignupResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [, dispatch] = useUserContext();

  const userr = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, { email, password });
      const result: User = response.data; 
      dispatch({ type: "LOGIN", payload: result });
      localStorage.setItem("user", JSON.stringify(result));
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.msg || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { userr, loading, error };
};
