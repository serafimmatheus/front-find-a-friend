import { HeaderProfile } from "@/components/HeaderProfile";
import RoutePrivate from "@/components/routePrivates";
import { useAuthContext } from "@/context/hooks/useAuthProvider";
import { api } from "@/data/api";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import celo from "src/assets/celo.png";

interface IPropsAnimal {
  ambiente: string;
  coverImage: string;
  gatoOuCachorro: string;
  id: string;
  idade: string;
  imagesUrl: string[];
  nivelEnergia: string;
  nivelIndependencia: string;
  nome: string;
  organizacaoId: string;
  porte: string;
  requisitosDoacao: string[];
  sobre: string;
}

interface IPropsPets {
  cep: string;
  cidade: string;
  email: string;
  endereco: string;
  estado: string;
  id: string;
  nome: string;
  pets: IPropsAnimal[]; // Aqui você pode definir um tipo específico se souber a estrutura dos objetos em "pets".
  whatsapp: string;
}

export default function Pets() {
  const [pets, setPets] = useState<IPropsAnimal[]>([]);
  const route = useRouter();
  const { usuario } = useAuthContext();

  async function handlePets() {
    api
      .get("/organizacoes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token-find-a-friends"
          )}`,
        },
      })
      .then((res) => {
        if (res.data) {
          const filterPets = res.data.filter(
            (elem: IPropsPets) => elem.email === usuario.email
          );
          if (filterPets.length > 0) {
            setPets(filterPets[0].pets);
          }
        }
      });
  }

  function irParaDetalhesDoPet(id: string) {
    route.push(`/amigos/detalhes/${id}`);
  }

  useEffect(() => {
    handlePets();
  }, []);

  return (
    <>
      <Head>
        <title>Meus pets | Find a friend</title>
      </Head>
      <RoutePrivate>
        <HeaderProfile />
        <div className="flex container m-auto w-full">
          <div className="flex flex-wrap justify-start gap-5 overflow-auto w-full h-2/3 mt-32 pb-10 pl-2">
            {pets?.length === 0 ? (
              <div className="flex w-full flex-col h-96 border border-dashed animate-pulse justify-center items-center">
                <p className="text-2xl text-gray-400 font-nunito font-semibold">
                  Você não possui nenhum pet cadastrado
                </p>

                <Link
                  className="mt-20 text-white bg-red-600 px-4 py-2 rounded-lg font-nunito font-semibold"
                  href={"/cadastro/pet"}
                >
                  Cadastrar um pet novo
                </Link>
              </div>
            ) : (
              pets.map((elem) => {
                return (
                  <div
                    key={elem.id}
                    className="w-[280px] h-72 bg-yellow relative rounded-3xl cursor-pointer text-gray-400 hover:text-white hover:bg-gray-400"
                    onClick={() => irParaDetalhesDoPet(elem.id)}
                  >
                    <div className="p-[2px] w-full h-[210px] relative">
                      <Image
                        className="rounded-3xl object-cover"
                        src={elem.coverImage}
                        fill
                        alt="imagens dos pets"
                      />
                    </div>

                    {elem.gatoOuCachorro === "gato" ? (
                      <div className="flex justify-center items-center w-11 h-11 bg-red-500 rounded-lg border-white border-[2px] absolute top-48 left-1/2 -translate-x-1/2">
                        <Image src={celo} alt="celo" />
                      </div>
                    ) : (
                      <div className="flex justify-center items-center w-11 h-11 bg-green-400 rounded-lg border-white border-[2px] absolute top-48 left-1/2 -translate-x-1/2">
                        <Image src={celo} alt="celo" />
                      </div>
                    )}

                    <div className="mt-8 text-center">
                      <h4 className="text-lg font-nunito font-bold">
                        {elem.nome}
                      </h4>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </RoutePrivate>
    </>
  );
}

{
  /* <div className="flex flex-wrap justify-start gap-5 overflow-auto w-full h-2/3 mt-10 pb-10 pl-2">
          {pets?.length === 0 ? (
            <div className="flex w-full border border-dashed animate-pulse justify-center items-center">
              <p className="text-2xl text-gray-400 font-nunito font-semibold">
                Não encontramos nenhum pet para na sua região
              </p>
            </div>
          ) : (
            pets.map((elem) => {
              return (
                <div
                  key={elem.id}
                  className="w-[280px] h-72 bg-white relative rounded-3xl cursor-pointer text-gray-400 hover:text-white hover:bg-gray-400"
                  onClick={() => irParaDetalhesDoPet(elem.id)}
                >
                  <div className="p-[2px] w-full h-[210px] relative">
                    <Image
                      className="rounded-3xl object-cover"
                      src={elem.coverImage}
                      fill
                      alt="imagens dos pets"
                    />
                  </div>

                  {elem.gatoOuCachorro === "gato" ? (
                    <div className="flex justify-center items-center w-11 h-11 bg-red-500 rounded-lg border-white border-[2px] absolute top-48 left-1/2 -translate-x-1/2">
                       <Image src={celo} alt="celo" />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center w-11 h-11 bg-green-400 rounded-lg border-white border-[2px] absolute top-48 left-1/2 -translate-x-1/2">
                     <Image src={celo} alt="celo" />
                    </div>
                  )}

                  <div className="mt-8 text-center">
                    <h4 className="text-lg font-nunito font-bold">
                      {elem.nome}
                    </h4>
                  </div>
                </div>
              );
            })
          )}
        </div> */
}
