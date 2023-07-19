import Image from "next/image";
import miniLogo from "../../../assets/mini-logo.png";

import { FlechaParaEsquerda, Voltar } from "@/icons/icons";
import { useRouter } from "next/router";
import RoutePrivate from "@/components/routePrivates";
import { useAuthContext } from "@/context/hooks/useAuthProvider";
import { useEffect, useState } from "react";
import { api } from "@/data/api";

export default function CadastroPets() {
  const route = useRouter();

  const [nome, setNome] = useState("");
  const [sobre, setSobre] = useState("");
  const [idade, setIdade] = useState("");
  const [porte, setPorte] = useState("");
  const [nivelEnergia, setNivelEnergia] = useState("");
  const [nivelIndependencia, setNivelIndependencia] = useState("");
  const [ambiente, setAmbiente] = useState("");
  const [gatoOuCachorro, setGatoOuCachorro] = useState("");

  const { usuario, sairDaAplicacao, token } = useAuthContext();

  function backPage() {
    route.push("/");
  }

  async function handleSubmitForm() {
    const data = {
      nome,
      sobre,
      idade,
      porte,
      nivelEnergia,
      nivelIndependencia,
      ambiente,
      gatoOuCachorro,
      organizacaoId: usuario.id,
    };

    await api
      .post(`/pets`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token-find-a-friends"
          )}`,
        },
      })
      .then((_) => {
        route.push("/");
      })
      .catch((_) => {
        alert("Erro ao cadastrar pet");
      });
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

      <div className="flex w-full h-full bg-red-150 overflow-hidden pb-20">
        <div className="flex flex-col w-full h-full items-center overflow-auto">
          <div className="flex gap-8 h-[120px] bg-gray-400 w-1/2 items-center justify-between px-20 rounded-3xl mt-24">
            <div className="flex items-center py-20 gap-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-400">
                <Image src={miniLogo} alt="loguinho" />
              </div>

              <div className="flex flex-col">
                <h2 className="font-nunito font-bold text-white text-3xl">
                  {usuario.organizacao}
                </h2>
                <p className="font-nunito font-normal text-white text-base">
                  {usuario.endereco}, {usuario.cidade}, {usuario.estado}
                </p>
              </div>
            </div>

            <div
              className="h-16 w-16 bg-gray-300 flex items-center justify-center rounded-2xl cursor-pointer"
              onClick={sairDaAplicacao}
            >
              <Voltar />
            </div>
          </div>

          <div className="flex flex-col bg-white w-1/2 px-20 rounded-3xl mt-10">
            <div className="mt-14">
              <h2 className="font-nunito font-extrabold text-gray-400 text-4xl">
                Adicione um pet
              </h2>
            </div>

            <div className="mt-8 mb-14">
              <div className="h-[1px] w-full bg-gray-75"></div>
            </div>

            <div className="flex flex-col mb-8">
              <label className="flex mb-2 font-nunito items-center text-gray-400 font-normal text-base">
                Nome
              </label>

              <input
                className="border border-gray-75 rounded-xl h-16 px-5"
                type="text"
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="flex flex-col mb-8">
              <label className="flex mb-2 font-nunito items-center text-gray-400 font-normal text-base">
                Sobre
                <span className="flex items-end ml-10 text-gray-200 text-xs">
                  Máximo de 300 caracteres
                </span>
              </label>

              <textarea
                className="resize-none border border-gray-75 rounded-xl h-[120px] px-5 py-4"
                onChange={(e) => setSobre(e.target.value)}
              />
            </div>

            <div className="flex flex-col mb-8">
              <label className="flex mb-2 font-nunito items-center text-gray-400 font-normal text-base">
                Idade
              </label>

              <select
                className="border border-gray-75 rounded-xl h-16 px-5"
                onChange={(e) => setIdade(e.target.value)}
              >
                <option>Escolha uma opção</option>
                <option value="filhote">Filhote</option>
                <option value="adulto">Adulto</option>
              </select>
            </div>

            <div className="flex flex-col mb-8">
              <label className="flex mb-2 font-nunito items-center text-gray-400 font-normal text-base">
                Porte
              </label>

              <select
                className="border border-gray-75 rounded-xl h-16 px-5"
                onChange={(e) => setPorte(e.target.value)}
              >
                <option>Escolha uma opção</option>
                <option value="pequeno">Pequeno</option>
                <option value="medio">Médio</option>
                <option value="grande">Grande</option>
              </select>
            </div>

            <div className="flex flex-col mb-8">
              <label className="flex mb-2 font-nunito items-center text-gray-400 font-normal text-base">
                Nível de energia
              </label>

              <select
                className="border border-gray-75 rounded-xl h-16 px-5"
                onChange={(e) => setNivelEnergia(e.target.value)}
              >
                <option>Escolha uma opção</option>
                <option value="pouca">Pouca</option>
                <option value="media">Média</option>
                <option value="muita">Muita</option>
              </select>
            </div>

            <div className="flex flex-col mb-8">
              <label className="flex mb-2 font-nunito items-center text-gray-400 font-normal text-base">
                Nível de independência
              </label>

              <select
                className="border border-gray-75 rounded-xl h-16 px-5"
                onChange={(e) => setNivelIndependencia(e.target.value)}
              >
                <option>Escolha uma opção</option>
                <option value="baixo">
                  Baixo (precisa de companhia sempre)
                </option>
                <option value="medio">
                  Médio (precisa de pouca companhia)
                </option>
                <option value="alto">Alto (independênte)</option>
              </select>
            </div>

            <div className="flex flex-col mb-8">
              <label className="flex mb-2 font-nunito items-center text-gray-400 font-normal text-base">
                Ambiente
              </label>

              <select
                className="border border-gray-75 rounded-xl h-16 px-5"
                onChange={(e) => setAmbiente(e.target.value)}
              >
                <option>Escolha uma opção</option>
                <option value="pequeno">Pequeno</option>
                <option value="medio">Médio</option>
                <option value="amplo">Amplo</option>
              </select>
            </div>

            <div className="flex flex-col mb-8">
              <label className="flex mb-2 font-nunito items-center text-gray-400 font-normal text-base">
                Gato/Cachorro
              </label>

              <select
                className="border border-gray-75 rounded-xl h-16 px-5"
                onChange={(e) => setGatoOuCachorro(e.target.value)}
              >
                <option>Escolha uma opção</option>
                <option value="gato">Gato</option>
                <option value="cachorro">Cachorro</option>
              </select>
            </div>

            {/* <div className="flex flex-col w-full font-nunito mb-8">
                <label className="flex mb-2 font-nunito items-center text-gray-400 font-normal text-base">
                  Fotos
                </label>

                <div className="flex flex-col border border-gray-75 rounded-xl h-36 justify-center items-center">
                  <h2 className="mt-4 text-lg font-medium text-gray-400">
                    Arraste e solte o arquivo
                  </h2>
                  <input type="file" className="hidden" multiple />
                </div>
              </div> */}

            {/* <div className="flex flex-col mt-8">
                <h2 className="flex font-nunito text-gray-400 font-bold text-3xl">
                  Requisitos para adoção
                </h2>

                <div className="mt-8 mb-14">
                  <div className="h-[1px] w-full bg-gray-75"></div>
                </div>

                <div className="flex flex-col mb-8">
                  <label className="flex mb-2 font-nunito items-center text-gray-400 font-normal text-base">
                    Reqisito
                  </label>

                  <input
                    className="border border-gray-75 rounded-xl h-16 px-5"
                    type="text"
                    placeholder="Defina um requisito..."
                  />
                </div>
              </div> */}

            <div className="flex flex-col w-full mt-8 mb-8">
              <button
                className="w-full border rounded-xl bg-gray-400 text-white py-4 hover:bg-gray-300"
                onClick={handleSubmitForm}
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
