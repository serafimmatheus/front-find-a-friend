import { HeaderProfile } from "@/components/HeaderProfile";
import MyInput from "@/components/MyInput";
import RoutePrivate from "@/components/routePrivates";
import { useAuthContext } from "@/context/hooks/useAuthProvider";
import { api } from "@/data/api";
import Head from "next/head";
import { useState } from "react";

export default function Profile() {
  const { usuario } = useAuthContext();

  const [nome, setNome] = useState(usuario.nome);
  const [organizacao, setOrganizacao] = useState(usuario.organizacao);
  const [cep, setCep] = useState(usuario.cep);
  const [estado, setEstado] = useState(usuario.estado);
  const [cidade, setCidade] = useState(usuario.cidade);
  const [endereco, setEndereco] = useState(usuario.endereco);
  const [whatsapp, setWhatsapp] = useState(usuario.whatsapp);

  async function handleSaveUser() {
    const data = {
      nome,
      organizacao,
      cep,
      estado,
      cidade,
      endereco,
      whatsapp,
    };

    await api
      .put(`/organizacoes/${usuario.id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token-find-a-friends"
          )}`,
        },
      })
      .then((__) => {
        location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <>
      <Head>
        <title>{usuario.nome} | Find a friend</title>
      </Head>
      <RoutePrivate>
        <HeaderProfile />
        <div className="flex container m-auto">
          <div className="flex flex-col w-full mt-28">
            <div>
              <h2 className="font-nunito text-5xl text-gray-400">
                Minha conta
              </h2>
            </div>

            <div className="w-full py-10">
              <MyInput
                label="Nome"
                placeholder=""
                onChange={(e) => setNome(e.target.value)}
                defaultValue={usuario.nome}
              />
              <MyInput
                label="Organização"
                placeholder=""
                defaultValue={usuario.organizacao}
                onChange={(e) => setOrganizacao(e.target.value)}
              />

              <MyInput
                label="E-mail"
                placeholder=""
                value={usuario.email}
                disabled
              />

              <MyInput
                label="Estado"
                placeholder=""
                defaultValue={usuario.estado}
                onChange={(e) => setEstado(e.target.value)}
              />

              <MyInput
                label="Cidade"
                placeholder=""
                defaultValue={usuario.cidade}
                onChange={(e) => setCidade(e.target.value)}
              />

              <MyInput
                label="Endereço"
                placeholder=""
                defaultValue={usuario.endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />

              <MyInput
                label="CEP"
                placeholder=""
                defaultValue={usuario.cep}
                onChange={(e) => setCep(e.target.value)}
              />

              <MyInput
                label="WhatsApp"
                placeholder=""
                defaultValue={usuario.whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>

            <div className="flex pb-10">
              <button
                className="bg-green-400 px-10 py-4 rounded-xl text-white font-nunito text-base font-semibold hover:bg-opacity-90 transition"
                onClick={handleSaveUser}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </RoutePrivate>
    </>
  );
}
