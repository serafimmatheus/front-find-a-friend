import { HeaderProfile } from "@/components/HeaderProfile";
import MyInput from "@/components/MyInput";
import RoutePrivate from "@/components/routePrivates";
import { useAuthContext } from "@/context/hooks/useAuthProvider";

export default function Profile() {
  const { usuario } = useAuthContext();

  console.log(usuario);
  return (
    <RoutePrivate>
      <HeaderProfile />
      <div className="flex container m-auto">
        <div className="flex flex-col w-full mt-28">
          <div>
            <h2 className="font-nunito text-5xl text-gray-400">Minha conta</h2>
          </div>

          <div className="w-full py-10">
            <MyInput label="Nome" placeholder="" value={usuario.nome} />
            <MyInput
              label="Organização"
              placeholder=""
              value={usuario.organizacao}
            />

            <MyInput
              label="E-mail"
              placeholder=""
              value={usuario.email}
              disabled
            />
            <MyInput label="Estado" placeholder="" value={usuario.estado} />
            <MyInput label="Cidade" placeholder="" value={usuario.cidade} />
            <MyInput label="Endereço" placeholder="" value={usuario.endereco} />
            <MyInput label="CEP" placeholder="" value={usuario.cep} />
            <MyInput label="WhatsApp" placeholder="" value={usuario.whatsapp} />
          </div>

          <div className="flex pb-10">
            <button className="bg-green-400 px-10 py-4 rounded-xl text-white font-nunito text-base font-semibold hover:bg-opacity-90 transition">
              Salvar
            </button>
          </div>
        </div>
      </div>
    </RoutePrivate>
  );
}
