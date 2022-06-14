import React, { useState, createContext, ReactNode } from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
  user: User;
  isAuthenticated: boolean;
  signIn: (credentials: SignInParams) => Promise<void>;
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

type SignInParams = {
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    token: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!user.name);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);

  async function signIn({ email, password }: SignInParams): Promise<void> {
    setLoadingAuth(true);
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      const authenticatedUserData = response.data as User;

      await AsyncStorage.setItem(
        "@sujeitopizzaria",
        JSON.stringify(authenticatedUserData)
      );

      const { token } = authenticatedUserData;

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(authenticatedUserData);
      setIsAuthenticated(true);
      setLoadingAuth(false);
    } catch (err) {
      console.log("Erro ao acessar", err);
      setLoadingAuth(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
