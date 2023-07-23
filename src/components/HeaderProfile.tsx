"use client";
import Image from "next/image";

import logo from "../assets/logo.png";
import { useRouter } from "next/router";

export function HeaderProfile() {
  const router = useRouter();

  return (
    <header className="w-full h-24 bg-red-500 fixed">
      <div className="w-full h-full container m-auto">
        <div className="flex justify-between w-full h-full items-center">
          <div className="w-[215px] h-[56px] relative items-center">
            <Image src={logo} alt="Find a friends" fill />
          </div>

          <ul className="flex items-center gap-4">
            <li
              className="font-nunito text-base text-white font-semibold cursor-pointer"
              onClick={() => router.push("/")}
            >
              Home
            </li>

            <li
              className="font-nunito text-base text-white font-semibold cursor-pointer"
              onClick={() => router.push("/cadastro/pet")}
            >
              Cadastros
            </li>
            <li
              className="font-nunito text-base text-white font-semibold cursor-pointer"
              onClick={() => router.push("/profile/pets")}
            >
              Pets
            </li>

            <li
              className="font-nunito text-base text-white font-semibold cursor-pointer"
              onClick={() => router.push("/profile")}
            >
              Conta
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

{
  /* <div className="flex flex-col w-36 h-full bg-red-500 items-center justify-between">
<div className="flex my-10">
  <Image src={miniLogo} alt="Mini logo da aplicação" />
</div>

<button
  onClick={backPage}
  className="w-12 h-12 bg-yellow flex flex-col justify-center items-center text-white my-5 rounded-[20px]"
>
  <FlechaParaEsquerda />
</button>
</div> */
}
