import Image from "next/image";
import miniLogo from "../../../assets/mini-logo.png";
import fotoPrincipal from "../../../assets/Foto.png";
import { FlechaParaEsquerda } from "@/icons/icons";
import { useRouter } from "next/router";

export default function DetailsPet() {
  const route = useRouter();

  function backPage() {
    route.back();
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

          <div className="flex flex-col w-1/2 bg-white rounded-3xl">
            <div className="w-full">
              <Image
                className="w-full object-cover"
                src={fotoPrincipal}
                alt="Imagem do seu futuro pet"
              />
            </div>

            <div className="flex">
              <div className="flex">
                <Image
                  className="w-20 h-20 object-cover"
                  src={fotoPrincipal}
                  alt="mini imagens do seu futuro pet"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
