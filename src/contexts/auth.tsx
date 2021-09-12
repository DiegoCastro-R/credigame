import * as React from "react";
import { useContext } from "react";
import { createContext, useState, useEffect } from "react";

import Toast from "react-native-toast-message";

import * as auth from "../services/auth";
import api from "../services/api";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem("@CrediGameAuth:user");
      const storagedToken = await AsyncStorage.getItem("@CrediGameAuth:token");

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.Authorization = `Baerer ${storagedToken}`;
      }
    }

    loadStorageData();
  });

  async function signIn(email: string, password: string) {
    await auth.signIn(email, password).then(async (response) => {
      //@ts-ignore
      if (!response.success) {
        //@ts-ignore
        if (response.message === "User Email/Password does not match.") {
          Toast.show({
            type: "error",
            text1:
              "Erro ao validar email/senha, verifique os dados e tente novamente",
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error, tente novamente mais tarde.",
          });
        }
      }
      console.log("signin response:", response);
      //@ts-ignore
      setUser(response.user);
      //@ts-ignore
      api.defaults.headers.Authorization = `Baerer ${response.token}`;

      await AsyncStorage.setItem(
        "@CrediGameAuth:user", //@ts-ignore
        JSON.stringify(response.user)
      );
      //@ts-ignore
      await AsyncStorage.setItem("@CrediGameAuth:token", response.token);
    });
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}

export { AuthProvider, useAuth };
