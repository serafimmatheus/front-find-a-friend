import Image from "next/image";
import { useSearchParams } from "next/navigation";
import miniLogo from "../../../assets/mini-logo.png";
import { Search } from "@/icons/icons";
import imagemDoDoguinho from "../../../assets/jamie-street-UtrE5DcgEyg-unsplash.jpg";
import celo from "../../../assets/celo.png";

export default function Amigos() {
  const searchParams = useSearchParams();
  const estado = searchParams.get("estado");
  const cidade = searchParams.get("cidade");

  return (
    <div className="bg-white w-screen lg:h-screen overflow-hidden">
      <div className="flex w-full h-full">
        <div className="filtros w-1/3 h-full bg-red-500">
          <div className="bg-red-600 py-16 flex flex-col px-12">
            <div className="w-[45px] h-[46px]">
              <Image src={miniLogo} alt="mini logo" />
            </div>

            <div className="flex mt-10">
              <section className="w-[67px] h-[60px] flex flex-col justify-center items-center border text-white border-red-500 rounded-[20px] my-4 sm:mr-2">
                <option value="PE">PE</option>
              </section>

              <section className="w-[280px] h-[60px] bg-red-500 flex flex-col justify-center items-center text-white rounded-[20px] my-4 sm:mr-4">
                <option value="recife">Recife</option>
              </section>

              <button className="w-[60px] h-[60px] bg-yellow flex flex-col justify-center items-center text-white my-4 rounded-[20px]">
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
                <option value="1">Pouquissima energia</option>
                <option value="2">Pouca energia</option>
                <option value="3">Média energia</option>
                <option value="4">Muita energia</option>
                <option value="5">Extra energia</option>
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
              Encontre <b>354</b> amigos na sua cidade
            </h1>

            <select className="h-[60px] bg-red-200 rounded-2xl px-4 optional:text-gray-400 optional:text-base optional:font-nunito optional:font-normal outline-none">
              <option value="1">Gatos e Cachorros</option>
              <option value="2">Gatos</option>
              <option value="3">Cachorros</option>
            </select>
          </div>

          <div className="flex flex-wrap justify-start gap-5 overflow-auto w-full h-2/3 mt-10 pb-10 pl-2">
            {[
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
              18.19, 20, 20, 20,
            ].map((elem) => {
              return (
                <div
                  key={elem}
                  className="w-[280px] h-72 bg-white relative rounded-3xl "
                >
                  <div className="p-[2px] w-full relative">
                    <Image
                      className="rounded-3xl "
                      src={imagemDoDoguinho}
                      width={1000}
                      height={100}
                      alt="imagens dos pets"
                    />
                  </div>

                  <div className="flex justify-center items-center w-11 h-11 bg-red-500 rounded-lg border-white border-[2px] absolute top-48 left-1/2 -translate-x-1/2">
                    <Image src={celo} alt="celo" />
                  </div>

                  <div className="mt-8 text-center">
                    <h4 className="text-gray-400 text-lg font-nunito font-bold">
                      Alfredo
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
