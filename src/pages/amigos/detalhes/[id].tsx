import Image from "next/image";
import miniLogo from "../../../assets/mini-logo.png";
import fotoPrincipal from "../../../assets/Foto.png";
import { EspacoAmplo, FlechaParaEsquerda, Phone, Raio } from "@/icons/icons";
import { useRouter } from "next/router";
import { useState } from "react";

export default function DetailsPet() {
  const route = useRouter();
  const [lista, setLista] = useState([0, 1, 2, 3, 4, 5]);

  function backPage() {
    route.back();
  }

  function alterarAsImagens(num: number) {
    const novaLista = lista.forEach((elem) => (elem == num ? "sim" : "nao"));
    console.log(novaLista);
  }

  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col w-36 h-full bg-red-500 items-center justify-between">
        <div className="flex my-10">
          <Image src={miniLogo} alt="Mini logo da aplicação" />
        </div>

        <button
          onClick={backPage}
          className="w-12 h-12 bg-yellow flex flex-col justify-center items-center text-white my-5 rounded-[20px]"
        >
          <FlechaParaEsquerda />
        </button>
      </div>
      <div className="flex w-full h-full bg-red-150">
        <div className="flex flex-col w-full h-full items-center">
          <div className="flex">
            <h2 className="font-nunito text-lg font-semibold text-gray-200 my-10">
              Seu novo amigo
            </h2>
          </div>

          <div className="flex flex-col w-1/2 bg-white rounded-3xl ">
            <div className="w-full">
              <Image
                className="w-full object-cover"
                src={fotoPrincipal}
                alt="Imagem do seu futuro pet"
              />
            </div>

            <div className="flex justify-center items-center">
              {lista.map((elem) => {
                return (
                  <div
                    key={elem}
                    className="flex p-2 justify-center items-center mt-10"
                  >
                    <Image
                      onClick={() => alterarAsImagens(elem)}
                      className={`w-20 h-20 object-cover border-[3px] border-gray-400 rounded-md`}
                      src={fotoPrincipal}
                      alt="mini imagens do seu futuro pet"
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col mt-20 px-20">
              <h2 className="font-nunito font-extrabold text-5xl text-gray-400">
                Alfredo
              </h2>

              <p className="font-nunito font-semibold text-lg text-gray-400 my-10">
                Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora
                fazer companhia, uma bagunça mas também ama uma soneca.
              </p>
            </div>

            <div className="flex justify-between px-20">
              <div className="flex flex-col items-center border-[2px] px-8 py-4 border-gray-400 rounded-3xl">
                <div className="flex mb-2">
                  <Raio />
                  <Raio />
                  <Raio />
                  <Raio />
                </div>

                <span className="font-nunito font-semibold text-lg text-gray-400">
                  Muita energia
                </span>
              </div>

              <div className="flex flex-col border-[2px] px-8 py-4 border-gray-400 rounded-3xl">
                <div className="flex mb-2">
                  <EspacoAmplo />
                </div>

                <span className="font-nunito font-semibold text-lg text-gray-400 text-center">
                  Espaço amplo
                </span>
              </div>

              <div className="flex flex-col items-center justify-between border-[2px] px-8 py-4 border-gray-400 rounded-3xl">
                <div className="flex mb-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                </div>

                <span className="font-nunito font-semibold text-lg text-gray-400">
                  Pequenino
                </span>
              </div>
            </div>

            <div className="w-full my-10 px-20">
              <div className="w-full h-[2px] min-h-[2px] bg-gray-75"></div>
            </div>

            <div className="flex flex-col px-20">
              <div className="flex">
                <div className="flex w-16 h-16 bg-orange-400 rounded-2xl justify-center items-center">
                  <Image
                    src={miniLogo}
                    alt="imagem bem massa fera"
                    className="w-6 h-6"
                  />
                </div>

                <div className="flex flex-col ml-8">
                  <h3 className="font-nunito text-gray-400 font-bold text-3xl">
                    Seu Cãopanheiro
                  </h3>
                  <p className="font-nunito text-gray-400 font-semibold text-base mt-2">
                    Rua do meio, 123, Boa viagem, Recive - PE
                  </p>
                </div>
              </div>

              <div className="flex w-full justify-center mt-10">
                <button className="flex bg-gray-200 rounded-md px-8 py-4 gap-5">
                  <Phone />
                  81 1234.4567
                </button>
              </div>
            </div>

            <div className="w-full my-10 px-20">
              <div className="w-full h-[2px] min-h-[2px] bg-gray-75"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
