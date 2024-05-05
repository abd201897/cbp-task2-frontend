import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { message } from "antd";
import { LoginAPI, getStudentProfile } from "../apis";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();
// created context for global state management
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // created moke api for testing

  ///// loging function
  const login = useCallback(
    async (data) => {
      try {
        setLoading(true);
        // MOKE API CALL
        const res = await LoginAPI(data);
        const tempObj = {};
        if (res?.status < 400) {
          if (res?.data?.access) {
            const token = jwtDecode(res?.data?.access);
            const user_id = token?.user_id;
            setUser({ ...res?.data, token });
            message.success("Login Success");
            const { data } = await getStudentProfile(user_id);
            setUser({ ...res?.data, token: { ...token, ...data?.data } });
          }
          setError(null);
        } else {
          setError("invalid username/password");
          message.error(res?.data?.detail);
        }
        setLoading(false);
      } catch (error) {
        console.log("LOGIN ERROR", error);
        message.error(error?.meta?.message);
        setLoading(false);
      }
    },
    [user]
  );

  // logout function
  const logout = useCallback(() => {
    setUser(null);
  }, [user]);

  const value = useMemo(
    () => ({
      error,
      user,
      loading,
      login,
      logout,
    }),
    [user, login, logout, loading]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
