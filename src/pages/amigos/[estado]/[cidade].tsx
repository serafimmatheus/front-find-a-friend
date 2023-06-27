import Image from "next/image";
import miniLogo from "../../../assets/mini-logo.png";
import { Search } from "@/icons/icons";
import imagemDoDoguinho from "../../../assets/jamie-street-UtrE5DcgEyg-unsplash.jpg";
import imagemDoGatinho from "../../../assets/gato.png";
import celo from "../../../assets/celo.png";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePets } from "@/context/hooks/usePetsProvider";
import SkeletonPets from "@/components/skeletonPets";

interface IPropsPetsArray {}

export default function Amigos() {
  const route = useRouter();

  const [estado, setEstado] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");

  const [estadoSeach, setEstadoSearch] = useState("");
  const [cidadeSeach, setCidadeSearch] = useState("");

  const { handlePetsByCidadeAndEstado, pets, isLoading } = usePets();

  function irParaDetalhesDoPet(id: string) {
    route.push(`/amigos/detalhes/${id}`);
  }

  function searchPagePets2() {
    route.push(`/amigos/${estado}/${cidade}`);
  }

  async function handlePetsPage(estado: string, cidade: string) {
    // await handlePetsByCidadeAndEstado(estado, cidade);
    route.push(`/amigos/${estado}/${cidade}`);
  }

  async function handlePets(estado: string, cidade: string) {
    await handlePetsByCidadeAndEstado(estado, cidade);
  }

  useEffect(() => {
    const estado = Array.isArray(route.query.estado)
      ? route.query.estado.join(",")
      : "";
    const cidade = Array.isArray(route.query.cidade)
      ? route.query.cidade.join(",")
      : "";
    handlePets(estado, cidade);
  }, [route.query.estado, route.query.cidade]);

  return (
    <div className="bg-white w-screen lg:h-screen overflow-hidden">
      <div className="flex w-full h-full">
        <div className="filtros w-1/3 h-full bg-red-500">
          <div className="bg-red-600 py-16 flex flex-col px-12">
            <div className="w-[45px] h-[46px]">
              <Image src={miniLogo} alt="mini logo" />
            </div>

            <div className="flex mt-10">
              <select
                className="w-[72px] h-[72px] px-2 bg-red-500 border outline-none text-white border-white rounded-[20px] my-4 sm:mr-2"
                defaultValue={route.query.estado}
                onChange={(e) => setEstadoSearch(e.target.value)}
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
                defaultValue={route.query.cidade}
                onChange={(e) => setCidadeSearch(e.target.value)}
                placeholder="Digite sua cidade"
              />

              <button
                onClick={() => handlePetsPage(estadoSeach, cidadeSeach)}
                className="w-[72px] h-[72px] bg-yellow flex flex-col justify-center items-center text-white my-4 rounded-[20px]"
              >
                <Search />
              </button>
            </div>
          </div>

          <div className="px-12 mt-10 h-2/3 overflow-auto">
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

        <div className="navigation w-2/3 h-full pr-10 pl-5 bg-gray-100">
          <div className="flex justify-between items-center pt-40">
            <h1 className="font-nunito text-xl font-normal text-gray-400">
              Encontre <b>{pets.length}</b> amigos na sua cidade
            </h1>

            <select className="h-[60px] bg-red-200 rounded-2xl px-4 optional:text-gray-400 optional:text-base optional:font-nunito optional:font-normal outline-none">
              <option value="1">Gatos e Cachorros</option>
              <option value="2">Gatos</option>
              <option value="3">Cachorros</option>
            </select>
          </div>

          <div className="flex flex-wrap justify-start gap-5 overflow-auto w-full h-2/3 mt-10 pb-10 pl-2">
            {isLoading ? (
              <SkeletonPets />
            ) : pets.length === 0 ? (
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
                    <div className="p-[2px] w-full relative">
                      <Image
                        className="rounded-3xl "
                        src={
                          elem.gatoOuCachorro === "gato"
                            ? imagemDoGatinho
                            : imagemDoDoguinho
                        }
                        width={1000}
                        height={100}
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
  );
}
