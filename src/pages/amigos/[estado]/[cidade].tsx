import Image from "next/image";
import { Search } from "@/icons/icons";
import celo from "../../../assets/celo.png";
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
  const { cidade, estado } = context.query;

  let data: IPropsPets[] = [];
  await api.get(`/pets/${estado}/${cidade}`).then((response) => {
    data = data.concat(response.data);
  });

  // Retorne os dados como propriedades da página
  return {
    props: {
      data,
      cidade,
      estado,
    },
  };
}

export default function Amigos({
  data,
  estado,
  cidade,
}: {
  data: IPropsPets[];
  estado: string;
  cidade: string;
}) {
  const route = useRouter();

  const [estadoSeach, setEstadoSearch] = useState("");
  const [cidadeSeach, setCidadeSearch] = useState("");

  function irParaDetalhesDoPet(id: string) {
    route.push(`/amigos/detalhes/${id}`);
  }

  async function handlePetsPage(estado: string, cidade: string) {
    route.push(`/amigos/${estado}/${cidade}`);
  }

  useEffect(() => {}, [data, estado, cidade]);

  return (
    <>
      <Head>
        <title>Pets | Find a friend</title>
      </Head>
      <Header />
      <div className="bg-white w-full lg:h-full overflow-hidden">
        <div className="flex w-full h-full">
          <div className="filtros w-1/3 h-full bg-red-500">
            <div className="bg-red-600 py-16 h-full flex flex-col px-12">
              <div className="flex pt-20 h-full">
                <select
                  className="w-[72px] h-[72px] px-2 bg-red-500 border outline-none text-white border-white rounded-[20px] my-4 sm:mr-2"
                  defaultValue={estado}
                  onChange={(e) => setEstadoSearch(e.target.value)}
                  value={estadoSeach}
                >
                  <option value="AC">AC</option>
                  <option value="AL">AL</option>
                  <option value="AP">AP</option>
                  <option value="AM">AM</option>
                  <option value="BA">BA</option>
                  <option value="CE">CE</option>
                  <option value="DF">DF</option>
                  <option value="ES">ES</option>
                  <option value="GO">GO</option>
                  <option value="MA">MA</option>
                  <option value="MT">MT</option>
                  <option value="MS">MS</option>
                  <option value="MG">MG</option>
                  <option value="PA">PA</option>
                  <option value="PB">PB</option>
                  <option value="PR">PR</option>
                  <option value="PE">PE</option>
                  <option value="PI">PI</option>
                  <option value="RJ">RJ</option>
                  <option value="RN">RN</option>
                  <option value="RS">RS</option>
                  <option value="RO">RO</option>
                  <option value="RR">RR</option>
                  <option value="SC">SC</option>
                  <option value="SP">SP</option>
                  <option value="SE">SE</option>
                  <option value="TO">TO</option>
                </select>

                <input
                  className="w-[280px] h-[72px] outline-none placeholder:text-gray-100 px-4 bg-red-500 flex flex-col justify-center items-center text-white rounded-[20px] my-4 sm:mr-4"
                  type="text"
                  defaultValue={cidade}
                  onChange={(e) => setCidadeSearch(e.target.value)}
                  placeholder="Digite sua cidade"
                  value={cidadeSeach}
                />

                <button
                  onClick={() => handlePetsPage(estadoSeach, cidadeSeach)}
                  className="w-[72px] h-[72px] bg-yellow flex flex-col justify-center items-center text-white my-4 rounded-[20px]"
                >
                  <Search />
                </button>
              </div>
            </div>

            <div className="px-12 pt-10 h-full pb-28">
              <h2 className="text-white font-nunito font-extrabold text-xl ">
                Filtros
              </h2>

              <div className="flex flex-col mt-8">
                <label className="text-white text-xs font-medium font-nunito mb-2">
                  Idade
                </label>
                <select className="h-[60px] bg-red-600 rounded-2xl px-4 optional:text-white optional:text-base optional:font-nunito optional:font-extrabold outline-none">
                  <option value="filhote">Filhote</option>
                  <option value="adulto">Adulto</option>
                </select>
              </div>

              <div className="flex flex-col mt-8">
                <label className="text-white text-xs font-medium font-nunito mb-2">
                  Nível de Energia
                </label>
                <select className="h-[60px] bg-red-600 rounded-2xl px-4 optional:text-white optional:text-base optional:font-nunito optional:font-extrabold outline-none">
                  <option value="2">Pouca energia</option>
                  <option value="3">Média energia</option>
                  <option value="4">Muita energia</option>
                </select>
              </div>

              <div className="flex flex-col mt-8">
                <label className="text-white text-xs font-medium font-nunito mb-2">
                  Porte do animal
                </label>
                <select className="h-[60px] bg-red-600 rounded-2xl px-4 optional:text-white optional:text-base optional:font-nunito optional:font-extrabold outline-none">
                  <option value="pequenino">Pequenino</option>
                  <option value="medio">Médio</option>
                  <option value="grande">Grande</option>
                </select>
              </div>

              <div className="flex flex-col mt-8">
                <label className="text-white text-xs font-medium font-nunito mb-2">
                  Nível de independência
                </label>
                <select className="h-[60px] bg-red-600 rounded-2xl px-4 optional:text-white optional:text-base optional:font-nunito optional:font-extrabold outline-none">
                  <option value="baixo">Baixo</option>
                  <option value="medio">Médio</option>
                  <option value="independente">Independente</option>
                </select>
              </div>
            </div>
          </div>

          <div className="navigation w-2/3 h-screen pr-10 pl-5 bg-gray-100">
            <div className="flex justify-between items-center pt-40">
              <h1 className="font-nunito text-xl font-normal text-gray-400">
                Encontre <b>{data.length}</b> amigos na sua cidade
              </h1>

              <select className="h-[60px] bg-red-200 rounded-2xl px-4 optional:text-gray-400 optional:text-base optional:font-nunito optional:font-normal outline-none">
                <option value="1">Gatos e Cachorros</option>
                <option value="2">Gatos</option>
                <option value="3">Cachorros</option>
              </select>
            </div>

            <div className="flex flex-wrap justify-start gap-5 overflow-auto w-full h-2/3 mt-10 pb-10 pl-2">
              {data?.length === 0 ? (
                <div className="flex w-full border border-dashed animate-pulse justify-center items-center">
                  <p className="text-2xl text-gray-400 font-nunito font-semibold">
                    Não encontramos nenhum pet para na sua região
                  </p>
                </div>
              ) : (
                data.map((elem) => {
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
