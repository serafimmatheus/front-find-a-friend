import Image from "next/image";
import miniLogo from "../../../assets/mini-logo.png";

import { Lixo, Voltar } from "@/icons/icons";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/hooks/useAuthProvider";
import { useState } from "react";
import { api } from "@/data/api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HeaderProfile } from "@/components/HeaderProfile";
import RoutePrivate from "@/components/routePrivates";

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
        route.push("/");
      })
      .catch((_) => {
        alert("Erro ao cadastrar pet");
      });
  }

  return (
    <RoutePrivate>
      <HeaderProfile />
      <div className="flex w-full">
        <div className="flex w-full h-full bg-red-150 overflow-hidden pb-20  mt-10">
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

              <div className="flex flex-col mb-8">
                <label className="flex mb-2 font-nunito items-center text-gray-400 font-normal text-base">
                  Foto de capa
                </label>

                <input
                  className="border border-gray-75 rounded-xl h-16 px-5 placeholder:text-gray-200"
                  type="text"
                  placeholder="Insira uma URL .png | .jpg | .jpeg"
                  onChange={(e) => setCoverImage(e.target.value)}
                />
              </div>

              <div className="flex flex-col mb-8">
                <label className="flex mb-2 font-nunito items-center text-gray-400 font-normal text-base">
                  Fotos
                </label>

                <div className="flex justify-between items-center gap-5">
                  <input
                    className="border border-gray-75 rounded-xl h-16 px-5 placeholder:text-gray-200 flex-1"
                    type="text"
                    placeholder="Insira uma URL .png | .jpg | .jpeg"
                    onChange={(e) => setImageUrl(e.target.value)}
                  />

                  <button
                    className="border border-green-400 h-16 rounded-xl px-5 bg-green-400 text-white hover:bg-white hover:text-gray-400 hover:transition-colors"
                    onClick={() => handleImages()}
                  >
                    Adicionar
                  </button>
                </div>

                <ul className="mt-8 flex flex-wrap w-full gap-3 justify-center">
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

              <div className="flex flex-col mb-8">
                <label className="flex mb-2 font-nunito items-center text-gray-400 font-normal text-base">
                  Requisitos para a doação
                </label>

                <div className="flex justify-between items-center gap-5">
                  <input
                    className="border border-gray-75 rounded-xl h-16 px-5 placeholder:text-gray-200 flex-1"
                    type="text"
                    placeholder="Insira o requisito"
                    onChange={(e) => setRequisito(e.target.value)}
                  />

                  <button
                    className="border border-green-400 h-16 rounded-xl px-5 bg-green-400 text-white hover:bg-white hover:text-gray-400 hover:transition-colors"
                    onClick={() => handleRequisitos()}
                  >
                    Adicionar
                  </button>
                </div>

                <ul className="mt-8 flex flex-wrap w-full gap-3 justify-center">
                  {requisitos.map((requisito, index) => (
                    <li
                      className="w-full px-5 h-14 relative border border-red-500 flex items-center rounded-xl text-gray-400 hover:bg-red-500 hover:text-white cursor-pointer"
                      key={`${index}-requisitos`}
                    >
                      <p>{requisito}</p>

                      <button
                        className="absolute right-5"
                        onClick={() =>
                          excluirRequisitoDaLista(`${index}-requisitos`)
                        }
                      >
                        <Lixo />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col mb-8">
                <label className="flex mb-2 font-nunito items-center text-gray-400 font-normal text-base">
                  Nome
                </label>

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
      </div>
    </RoutePrivate>
  );
}
