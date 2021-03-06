import React, { useState, createContext, ReactNode, useEffect } from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
  user: User;
  isAuthenticated: boolean;
  signIn: (credentials: SignInParams) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingAuth: boolean;
  isLoadingOfflineData: boolean;
};

type User = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type SignInParams = {
  email: string;
  password: string;
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
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  const [isLoadingOfflineData, setIsLoadingOfflineData] = useState<boolean>(true);

  useEffect(() => {
    async function getUserOfflineData(): Promise<void> {
      const userData: string | null = await AsyncStorage.getItem(
        "@sujeitopizzaria"
      );

      if (userData) {
        const { id, name, email, token } = JSON.parse(userData);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setUser({
          id,
          name,
          email,
          token,
        });

        setIsAuthenticated(true);
      }
      setIsLoadingOfflineData(false);
    }

    getUserOfflineData();
  }, []);

  async function signIn({ email, password }: SignInParams): Promise<void> {
    setIsLoadingAuth(true);
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
      setIsLoadingAuth(false);
    } catch (err) {
      console.log("Erro ao acessar", err);
      setIsLoadingAuth(false);
    }
  }

  async function signOut(): Promise<void> {
    await AsyncStorage.clear();

    setUser({
      id: "",
      name: "",
      email: "",
      token: "",
    });

    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        signOut,
        isLoadingAuth,
        isLoadingOfflineData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
