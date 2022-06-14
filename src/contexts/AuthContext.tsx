import React, { useState, createContext, ReactNode } from "react";

type AuthContextData = {
  user: User;
  isAuthenticated: boolean;
};

type User = {
  id: string;
  name: string;
  email: string;
  token: string;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    token: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!user.name);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
