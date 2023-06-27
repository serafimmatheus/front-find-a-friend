import Image from "next/image";
import logo from "../../assets/logo.png";
import logoPets from "../../assets/dogs.png";
import { useState } from "react";
import MyInput from "@/components/MyInput";
import { useAuthContext } from "@/context/hooks/useAuthProvider";
import RoutePrivate from "@/components/routePrivates";
import InvalidLogin from "@/components/invalidLogin";

export default function Login() {
  const [modo, isModo] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLogin, isLoading } = useAuthContext();

  async function handleLogin() {
    await login(email, password);
  }

  return (
    <RoutePrivate>
      <div className="flex justify-center w-screen h-screen bg-white overflow-x-hidden">
        {isLoading && (
          <div className="w-full h-full justify-center items-center absolute bg-red-200 opacity-75">
            <div className="w-12 h-12 relative left-1/2 top-1/2 rounded-full animate-spin border-x-8 border-solid border-orange-400 border-t-transparent"></div>
          </div>
        )}
        <div className="flex w-1/2 h-full justify-center items-center">
          <div className="flex flex-col w-1/2 h-4/5 bg-red-500 p-11 rounded-3xl justify-between items-center">
            <div>
              <Image src={logo} alt="logo da aplicação" />
            </div>

            <div className="w-64">
              <Image src={logoPets} alt="logo 2 da aplicação" />
            </div>
          </div>
        </div>

        <div className="flex w-1/2 h-full mt-36">
          <div>
            {modo === "login" ? (
              <>
                <div>
                  <h2 className="font-nunito font-bold text-6xl text-gray-400">
                    Boas-vindas!
                  </h2>
                </div>

                <div className="flex flex-col mt-16">
                  {isLogin && <InvalidLogin />}

                  <MyInput
                    label="E-mail"
                    placeholder="Digite sua senha..."
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <MyInput
                    label="Senha"
                    placeholder="Digite sua senha..."
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    className="h-[72px] font-nunito font-extrabold text-xl text-white bg-gray-400 px-3 rounded-3xl my-12"
                    onClick={handleLogin}
                  >
                    Login
                  </button>

                  <h4
                    onClick={() => isModo("register")}
                    className="font-nunito font-extrabold text-xl text-gray-400 text-center hover:underline cursor-pointer"
                  >
                    Cadastrar minha organização
                  </h4>
                </div>
              </>
            ) : (
              <>
                <div className="">
                  <h2 className="font-nunito font-bold text-6xl text-gray-400">
                    Cadastre sua <br /> organização
                  </h2>
                </div>
                <div className="flex flex-col mt-16">
                  <MyInput
                    label="Nome do responsável"
                    placeholder="Digite o nome do responsável..."
                  />

                  <MyInput
                    label="E-mail"
                    placeholder="Digite seu e-mail..."
                    type="email"
                  />

                  <MyInput label="CEP" placeholder="Digite o CEP..." />

                  <MyInput
                    label="Endereço"
                    placeholder="Digite o endereço..."
                  />

                  <MyInput
                    label="Whatsapp"
                    placeholder="Digite o Whatsapp..."
                  />

                  <MyInput
                    label="Senha"
                    placeholder="Digite sua senha..."
                    type="password"
                  />

                  <MyInput
                    label="Confirmar Senha"
                    placeholder="Confirme sua senha..."
                    type="password"
                  />

                  <button className="h-[72px] font-nunito font-extrabold text-xl text-white bg-gray-400 px-3 rounded-3xl my-12">
                    Cadastrar
                  </button>

                  <h4
                    onClick={() => isModo("login")}
                    className="font-nunito font-extrabold text-xl text-gray-400 text-center hover:underline cursor-pointer mb-10"
                  >
                    Cadastrar minha organização
                  </h4>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </RoutePrivate>
  );
}
