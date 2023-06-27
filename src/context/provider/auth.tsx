import { api } from "@/data/api";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

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
}

export const AuthContext = createContext<AuthContextIProps>(
  {} as AuthContextIProps
);

function AuthRouter() {
  return useRouter();
}

export function AuthProvider({ children }: IPropsAuthProvider) {
  const [usuario, setUsuario] = useState<IPropsUsuario>({} as IPropsUsuario);
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState<string>();

  const route = AuthRouter();

  async function login(email: string, password: string) {
    await api
      .post("/login", { email, password })
      .then((responde) => {
        setUsuario(responde.data.user);
        setToken(responde.data.token);
        localStorage.setItem("token-find-a-friends", responde.data.token);
        localStorage.setItem(
          "user-find-a-friends",
          JSON.stringify(responde.data.user)
        );

        route.push("/cadastro/pet");
      })
      .catch((err) => {
        setIsLogin(true);
      })
      .finally(() => {});
  }

  async function sairDaAplicacao() {
    setUsuario({} as any);
    localStorage.removeItem("token-find-a-friends");
    localStorage.removeItem("user-find-a-friends");
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
  }, [usuario]);

  return (
    <AuthContext.Provider
      value={{ login, usuario, sairDaAplicacao, isLogin, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
