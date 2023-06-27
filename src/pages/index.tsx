import Image from "next/image";
import { Inter } from "next/font/google";
import logo from "../assets/logo.png";
import doguinhos from "../assets/dogs.png";
import { Search } from "@/icons/icons";
import { useRouter } from "next/router";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");

  const route = useRouter();

  function searchPagePets() {
    if (!estado && !cidade) {
      return alert("Por favor, insira um estado e uma cidade.");
    }
    route.push(`/amigos/${estado}/${cidade}`);
  }
  return (
    <main className="bg-red-500 w-screen lg:h-screen">
      <div className="container flex flex-col w-full max-w-7xl my-0 mx-auto px-4">
        <div className="flex pt-10 sm:pt-24 justify-between items-center w-full">
          <div className=" w-[215px] h-[56px]  ">
            <Image src={logo} alt="Logo" />
          </div>

          <div className="flex gap-4">
            <button
              className="border border-white px-10 py-1 text-white rounded-2xl hover:bg-red-600"
              onClick={() => route.push("/login")}
            >
              Logar
            </button>

            <button
              className="border border-white px-10 py-1 text-white rounded-2xl hover:bg-red-600"
              onClick={() => route.push("/login")}
            >
              cadastrar
            </button>
          </div>
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

            <select
              onChange={(e) => setEstado(e.target.value)}
              className="w-[72px] h-[72px] px-2 bg-red-500 border outline-none text-white border-white rounded-[20px] my-4 sm:mr-2"
              defaultValue={"AC"}
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
              className="w-[280px] h-[72px] outline-none placeholder:text-gray-100 px-4 bg-red-600 flex flex-col justify-center items-center text-white rounded-[20px] my-4 sm:mr-4"
              type="text"
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Digite sua cidade"
            />

            <button
              onClick={searchPagePets}
              className="w-[72px] h-[72px] bg-yellow flex flex-col justify-center items-center text-white my-4 rounded-[20px]"
            >
              <Search />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
