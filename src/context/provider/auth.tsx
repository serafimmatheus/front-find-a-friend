import { api } from "@/data/api";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";

interface IPropsAuthProvider {
  children: React.ReactNode;
}

interface IPropsUsuario {
  cep: string;
  cidade: string;
  email: string;
  endereco: string;
  estado: string;
  nome: string;
  organizacao: string;
  whatsapp: string;
}

interface AuthContextIProps {
  login(email: string, password: string): Promise<void>;
  usuario: any;
  sairDaAplicacao(): Promise<void>;
  isLogin: boolean;
  token: string | undefined;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextIProps>(
  {} as AuthContextIProps
);

export function AuthProvider({ children }: IPropsAuthProvider) {
  const [usuario, setUsuario] = useState<IPropsUsuario>({} as IPropsUsuario);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoadin] = useState(false);
  const [token, setToken] = useState<string>();

  const router = useRouter();

  async function login(email: string, password: string) {
    setIsLoadin(true);
    await api
      .post("/login", { email, password })
      .then((responde) => {
        setUsuario(responde.data.user);
        setToken(responde.data.token);

        if (!responde.data.user && !responde.data.token) {
          return;
        }

        localStorage.setItem("token-find-a-friends", responde.data.token);
        localStorage.setItem(
          "user-find-a-friends",
          JSON.stringify(responde.data.user)
        );

        setIsLoadin(false);

        router.push("/cadastro/pet");
      })
      .catch((err) => {
        setIsLogin(true);
        setIsLoadin(false);
      })
      .finally(() => {
        setIsLoadin(false);
      });
  }

  async function sairDaAplicacao() {
    setUsuario({} as any);
    localStorage.removeItem("token-find-a-friends");
    localStorage.removeItem("user-find-a-friends");

    router.push("/");
  }

  useEffect(() => {
    if (localStorage.getItem("token-find-a-friends")) {
      const token: any = localStorage.getItem("token-find-a-friends");

      const { sub }: any = jwt.decode(token);

      api
        .get(`/organizacao/${sub}`)
        .then((response) => {
          setUsuario(response.data);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, usuario, sairDaAplicacao, isLogin, token, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
