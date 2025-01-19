import Image from "next/image";
import miniLogo from "../../../assets/mini-logo.png";

import { Lixo, Voltar } from "@/icons/icons";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/hooks/useAuthProvider";
import { useState } from "react";
import { api } from "@/data/api";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HeaderProfile } from "@/components/HeaderProfile";
import RoutePrivate from "@/components/routePrivates";
import Head from "next/head";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CadastroPets() {
  const route = useRouter();

  const [nome, setNome] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [requisito, setRequisito] = useState("");
  const [requisitos, setRequisitos] = useState<string[]>([]);
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

  function handleImages() {
    setImagesUrl([...imagesUrl, imageUrl]);
  }

  function handleRequisitos() {
    setRequisitos([...requisitos, requisito]);
  }

  function excluirRequisitoDaLista(index: any) {
    const newList = [...requisitos];
    newList.splice(index, 1);
    setRequisitos(newList);
  }

  function excluirImagemDaLista(index: any) {
    const newList = [...imagesUrl];
    newList.splice(index, 1);
    setImagesUrl(newList);
  }

  function toastComponent(text: string) {
    const notify = () => toast(text);

    return notify;
  }

  async function handleSubmitForm() {
    const data = {
      nome,
      coverImage,
      imagesUrl,
      requisitosDoacao: requisitos,
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
        toastComponent(`${nome} foi adicionado com sucesso!`);
        route.push("/profile");
      })
      .catch((_) => {
        alert("Erro ao cadastrar pet");
      });
  }

  return (
    <>
      <Head>
        <title>Novo amiguinho | Find a friend</title>
        <link rel="icon" href="/mini-logo.ico" />
      </Head>
      <RoutePrivate>
        <HeaderProfile />
        <div className="flex w-full">
          <div className="flex w-full h-full bg-red-150 overflow-hidden pb-20  mt-10">
            <div className="flex flex-col w-full max-w-3xl px-4 mx-auto h-full items-center overflow-auto">
              <div className="flex gap-8 h-[120px] bg-gray-400 w-full items-center justify-between px-4 sm:px-10 md:px-20 rounded-xl mt-24">
                <div className="flex items-center py-20 gap-6">
                  <div className="flex items-center justify-center w-11 h-11 sm:w-16 sm:h-16 rounded-xl bg-orange-400 p-2">
                    <Image src={miniLogo} alt="loguinho" />
                  </div>

                  <div className="flex flex-col">
                    <h2 className="font-nunito font-bold text-white text-lg md:text-3xl">
                      {usuario.organizacao}
                    </h2>
                    <p className="font-nunito font-normal text-white text-sm md:text-base">
                      {usuario.endereco}, {usuario.cidade}, {usuario.estado}
                    </p>
                  </div>
                </div>

                <div
                  className="w-11 h-11 sm:w-16 sm:h-16 bg-gray-300 flex items-center justify-center rounded-xl cursor-pointer"
                  onClick={sairDaAplicacao}
                >
                  <Voltar />
                </div>
              </div>

              <div className="flex flex-col bg-white w-full px-4 sm:px-10 md:px-20 rounded-xl mt-10">
                <div className="mt-14">
                  <h2 className="font-nunito font-extrabold text-gray-400 text-2xl md:text-4xl">
                    Adicione um pet
                  </h2>
                </div>

                <div className="flex flex-col mt-8 mb-8">
                  <label className="flex mb-2 font-nunito items-center text-gray-400 font-semibold text-sm">
                    Foto de capa
                  </label>

                  <Input
                    className="border border-gray-75 h-11 placeholder:text-gray-200"
                    type="text"
                    placeholder="Insira uma URL .png | .jpg | .jpeg"
                    onChange={(e) => setCoverImage(e.target.value)}
                  />
                </div>

                <div className="flex flex-col mb-4">
                  <label className="flex mb-2 font-nunito items-center text-gray-400 font-semibold text-sm">
                    Fotos
                  </label>

                  <div className="flex justify-between items-center gap-3">
                    <Input
                      className="border border-gray-75 h-11 placeholder:text-gray-200 flex-1"
                      type="text"
                      placeholder="Insira uma URL .png | .jpg | .jpeg"
                      onChange={(e) => setImageUrl(e.target.value)}
                    />

                    <Button
                      className="border border-green-400 w-11 sm:w-auto h-11 px-5 bg-green-400 text-white hover:bg-white hover:text-gray-400 hover:transition-colors"
                      onClick={() => handleImages()}
                    >
                      <p className="hidden sm:flex">Adicionar</p>

                      <Plus size='18'  />
                    </Button>
                  </div>

                  <ul className="mt-4 flex flex-wrap w-full gap-3 justify-center">
                    {imagesUrl.map((image, index) => (
                      <li
                        className="h-[60px] w-[60px] relative bg-red-500 flex items-center rounded-xl text-gray-50"
                        key={index}
                      >
                        <div className="relative h-full w-full">
                          <Image src={image} fill alt={image} />
                        </div>

                        <button
                          className="absolute right-5"
                          onClick={() => excluirImagemDaLista(index)}
                        >
                          <Lixo />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col mb-4">
                  <label className="flex mb-2 font-nunito items-center text-gray-400 font-semibold text-sm">
                    Requisitos para a doação
                  </label>

                  <div className="flex justify-between items-center gap-3">
                    <Input
                      className="border border-gray-75 h-11 placeholder:text-gray-200 flex-1"
                      type="text"
                      placeholder="Insira o requisito"
                      onChange={(e) => setRequisito(e.target.value)}
                    />

                    <Button
                       className="border border-green-400 w-11 sm:w-auto h-11 px-5 bg-green-400 text-white hover:bg-white hover:text-gray-400 hover:transition-colors"
                      onClick={() => handleRequisitos()}
                    >
                      <p className="hidden sm:flex">Adicionar</p>
                      <Plus size='18'  />
                    </Button>
                  </div>

                  <ul className="mt-4 flex flex-wrap w-full gap-3 justify-center">
                    {requisitos.map((requisito, index) => (
                      <li
                        className="w-full px-3 justify-between sm:px-5 min-h-11 py-2 relative border border-red-500 flex items-center gap-3 rounded-md text-gray-400 hover:bg-red-500 hover:text-white cursor-pointer"
                        key={`${index}-requisitos`}
                      >
                        <p>{requisito}</p>

                        <Button
                          className="px-0"
                          variant='ghost'
                          onClick={() =>
                            excluirRequisitoDaLista(`${index}-requisitos`)
                          }
                        >
                          <Lixo />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col mb-4">
                  <div className="flex flex-col mb-4">
                    <label className="flex mb-2 font-nunito items-center text-gray-400 font-semibold text-sm">
                      Nome
                    </label>

                    <Input
                      className="border border-gray-75 h-11 placeholder:text-gray-200"
                      type="text"
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mb-4">
                    <label className="flex mb-2 font-nunito items-center text-gray-400 font-semibold text-sm">
                      Sobre
                      <span className="flex items-end ml-10 text-gray-200 text-xs">
                        Máximo de 300 caracteres
                      </span>
                    </label>

                    <textarea
                      className="resize-none border border-gray-75 rounded-md h-[120px] px-4 py-4"
                      onChange={(e) => setSobre(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mb-4">
                    <label className="flex mb-2 font-nunito items-center text-gray-400 font-semibold text-sm">
                      Idade
                    </label>

                    <select
                      className="border border-gray-75 rounded-md h-11 px-4"
                      onChange={(e) => setIdade(e.target.value)}
                    >
                      <option>Escolha uma opção</option>
                      <option value="filhote">Filhote</option>
                      <option value="adulto">Adulto</option>
                    </select>
                  </div>

                  <div className="flex flex-col mb-4">
                    <label className="flex mb-2 font-nunito items-center text-gray-400 font-semibold text-sm">
                      Porte
                    </label>

                    <select
                       className="border border-gray-75 rounded-md h-11 px-4"
                      onChange={(e) => setPorte(e.target.value)}
                    >
                      <option>Escolha uma opção</option>
                      <option value="pequeno">Pequeno</option>
                      <option value="medio">Médio</option>
                      <option value="grande">Grande</option>
                    </select>
                  </div>

                  <div className="flex flex-col mb-4">
                    <label className="flex mb-2 font-nunito items-center text-gray-400 font-semibold text-sm">
                      Nível de energia
                    </label>

                    <select
                      className="border border-gray-75 rounded-md h-11 px-4"
                      onChange={(e) => setNivelEnergia(e.target.value)}
                    >
                      <option>Escolha uma opção</option>
                      <option value="pouca">Pouca</option>
                      <option value="media">Média</option>
                      <option value="muita">Muita</option>
                    </select>
                  </div>

                  <div className="flex flex-col mb-4">
                    <label className="flex mb-2 font-nunito items-center text-gray-400 font-semibold text-sm">
                      Nível de independência
                    </label>

                    <select
                      className="border border-gray-75 rounded-md h-11 px-4"
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

                  <div className="flex flex-col mb-4">
                    <label className="flex mb-2 font-nunito items-center text-gray-400 font-semibold text-sm">
                      Ambiente
                    </label>

                    <select
                      className="border border-gray-75 rounded-md h-11 px-4"
                      onChange={(e) => setAmbiente(e.target.value)}
                    >
                      <option>Escolha uma opção</option>
                      <option value="pequeno">Pequeno</option>
                      <option value="medio">Médio</option>
                      <option value="amplo">Amplo</option>
                    </select>
                  </div>

                  <div className="flex flex-col mb-4">
                    <label className="flex mb-2 font-nunito items-center text-gray-400 font-semibold text-sm">
                      Gato/Cachorro
                    </label>

                    <select
                      className="border border-gray-75 rounded-md h-11 px-4"
                      onChange={(e) => setGatoOuCachorro(e.target.value)}
                    >
                      <option>Escolha uma opção</option>
                      <option value="gato">Gato</option>
                      <option value="cachorro">Cachorro</option>
                    </select>
                  </div>

                  <div className="flex flex-col w-full mt-4 mb-8">
                    <Button
                      className="w-full h-11 border rounded-md text-sm font-semibold bg-gray-400 text-white py-4 hover:bg-gray-300"
                      onClick={handleSubmitForm}
                    >
                      Cadastrar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RoutePrivate>
    </>
  );
}
