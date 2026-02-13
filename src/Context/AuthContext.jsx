import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mfaPending, setMfaPending] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setMfaPending(true);
  };

  const verifyMfa = () => {
    setMfaPending(false);
  };

  const logout = () => {
    setUser(null);
    setMfaPending(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        mfaPending,
        login,
        verifyMfa,
        logout,
        isAuthenticated: !!user && !mfaPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
