import Image from "next/image";
import { Inter } from "next/font/google";
import logo from "../assets/logo.png";
import doguinhos from "../assets/dogs.png";
import { Search } from "@/icons/icons";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="bg-red-500 w-screen lg:h-screen">
      <div className="container flex flex-col w-full max-w-7xl my-0 mx-auto px-4">
        <div className="w-[215px] h-[56px] pt-10 sm:pt-24">
          <Image src={logo} alt="Logo" />
        </div>

        <div className="w-full pt-32 sm:flex items-end justify-center">
          <div className="sm:w-1/2 flex mb-10">
            <h1 className="text-white font-extrabold text-2xl sm:text-7xl">
              Leve a felicidade para o seu lar
            </h1>
          </div>
          <div className="sm:w-1/2">
            <Image src={doguinhos} alt="Doguinhos amigaveis" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row  pt-28 items-center">
          <div className="flex sm:w-1/2 mb-10">
            <p className="text-white font-semibold text-2xl w-[407px] text-center sm:text-start">
              Encontre o animal de estimação ideal para seu estilo de vida!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center">
            <p className="text-white font-normal text-lg sm:mr-8">
              Busque um amigo:
            </p>

            <section className="w-[72px] h-[72px] flex flex-col justify-center items-center border text-white border-white rounded-[20px] my-4 sm:mr-2">
              <option value="PE">PE</option>
            </section>

            <section className="w-[280px] h-[72px] bg-red-600 flex flex-col justify-center items-center text-white rounded-[20px] my-4 sm:mr-4">
              <option value="recife">Recife</option>
            </section>

            <button className="w-[72px] h-[72px] bg-yellow flex flex-col justify-center items-center text-white my-4 rounded-[20px]">
              <Search />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
