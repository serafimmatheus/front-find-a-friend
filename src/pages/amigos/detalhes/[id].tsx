import Image from "next/image";
import miniLogo from "../../../assets/mini-logo.png";
import {
  Atencao,
  EspacoAmplo,
  FlechaParaEsquerda,
  Phone,
  Raio,
} from "@/icons/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "@/data/api";
import { GetServerSidePropsContext } from "next";
import { Header } from "@/components/Header";
import Head from "next/head";

interface IPropsOrganizacao {
  cep: string;
  cidade: string;
  email: string;
  endereco: string;
  estado: string;
  nome: string;
  organizacao: string;
  whatsapp: string;
}

interface IPropsPets {
  id: string;
  coverImage: string;
  imagesUrl: string[];
  requisitosDoacao: string[];
  ambiente: string;
  gatoOuCachorro: string;
  idade: string;
  nivelEnergia: string;
  nivelIndependencia: string;
  nome: string;
  porte: string;
  sobre: string;
  petId: IPropsOrganizacao;
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Faça a chamada para a API
  const { id } = context.query;

  let pet: IPropsPets | null = null;
  await api.get(`/pets/${id}`).then((response) => {
    pet = response.data;
  });
  return {
    props: {
      pet,
    },
  };
}

export default function DetailsPet({ pet }: { pet: IPropsPets }) {
  const route = useRouter();

  const [numero, setNumero] = useState(0);

  function backPage() {
    route.back();
  }

  // useEffect(() => {}, [pet]);

  return (
    <>
      <Head>
        <title>{pet.nome} | Find a friend</title>
      </Head>
      <Header />

      <div className="flex w-screen h-screen">
        <div className="flex w-full h-full bg-red-150 overflow-hidden pb-20">
          <div className="flex flex-col w-full h-full items-center overflow-auto ">
            <div className="flex">
              <h2 className="font-nunito text-lg font-semibold text-gray-200 my-10">
                Seu novo amigo
              </h2>
            </div>

            <div className="flex flex-col w-1/2 bg-white rounded-3xl ">
              <div className="relative w-full h-[400px] ">
                <button
                  onClick={backPage}
                  className="w-12 h-12 bg-yellow flex flex-col fixed left-5 cursor-pointer justify-center items-center z-40 text-white my-5 rounded-[20px]"
                >
                  <FlechaParaEsquerda />
                </button>

                <Image
                  className="object-cover object-top rounded-3xl"
                  src={pet.imagesUrl[numero]}
                  alt="Imagem do seu futuro pet"
                  fill
                />
              </div>

              <div className="flex justify-center items-center gap-4">
                {pet?.imagesUrl?.map((elem, index) => {
                  return (
                    <div
                      key={elem}
                      className="relative  flex p-2 justify-center w-20 h-20 items-center mt-10"
                      onClick={() => setNumero(index)}
                    >
                      <Image
                        className={`object-cover border-[3px] border-gray-400 rounded-md`}
                        src={elem}
                        alt="mini imagens do seu futuro pet"
                        fill
                      />
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col mt-20 px-20">
                <h2 className="font-nunito font-extrabold text-5xl text-gray-400">
                  {pet.nome}
                </h2>

                <p className="font-nunito font-semibold text-lg text-gray-400 my-10">
                  {pet.sobre}
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
                    {pet.nivelEnergia?.toLocaleUpperCase()}
                  </span>
                </div>

                <div className="flex flex-col border-[2px] px-8 py-4 border-gray-400 rounded-3xl">
                  <div className="flex mb-2">
                    <EspacoAmplo />
                  </div>

                  <span className="font-nunito font-semibold text-lg text-gray-400 text-center">
                    {pet.ambiente?.toLocaleUpperCase()}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-between border-[2px] px-8 py-4 border-gray-400 rounded-3xl">
                  <div className="flex mb-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
                    <div className="w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  </div>

                  <span className="font-nunito font-semibold text-lg text-gray-400">
                    {pet.porte?.toLocaleUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex justify-between px-20 mt-10">
                <div className="relative w-full h-[291px]">
                  <Image src="/Mapa.png" fill alt="localizacao" />
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
                      {pet.petId?.organizacao}
                    </h3>
                    <p className="font-nunito text-gray-400 font-semibold text-base mt-2">
                      {pet.petId?.endereco}, {pet.petId?.cidade} -{" "}
                      {pet.petId?.estado}
                    </p>
                  </div>
                </div>

                <div className="flex w-full ml-24 mt-10">
                  <button className="flex bg-linear-100 rounded-md px-8 py-4 gap-5">
                    <Phone />
                    {pet.petId?.whatsapp}
                  </button>
                </div>
              </div>

              <div className="w-full my-10 px-20">
                <div className="w-full h-[2px] min-h-[2px] bg-gray-75"></div>
              </div>

              <div className="flex flex-col px-20">
                <h2 className="font-nunito text-gray-400 font-bold text-3xl">
                  Requisitos para adoção
                </h2>
                <div className="mt-14 flex flex-col">
                  {pet.requisitosDoacao.map((requisito) => (
                    <div
                      key={pet.id}
                      className="flex items-center gap-5 px-14 py-4 mb-4 border border-red-500 rounded-xl"
                    >
                      <Atencao />
                      <p className="font-nunito text-red-500 font-semibold text-lg">
                        {requisito}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex px-20 mt-20 mb-20">
                <div className="flex bg-green-400 w-full h-16 rounded-3xl justify-center items-center text-white cursor-pointer">
                  <a
                    href={`https://api.whatsapp.com/send?phone=${pet.petId?.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Entrar em contato
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
