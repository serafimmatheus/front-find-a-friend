"use client";
import Image from "next/image";

import logo from "../assets/logo.png";
import { useRouter } from "next/router";
import Link from "next/link";

export function HeaderProfile() {
  const router = useRouter();

  return (
    <header className="w-full h-auto sm:h-24 bg-red-500 fixed z-50">
      <div className="w-full h-full max-w-[1440px] mx-auto px-5 py-3">
        <div className="flex flex-col gap-4 sm:flex-row justify-between w-full h-full items-center">
          <div className="w-[215px] h-[56px] relative items-center">
            <Link href="/">
              <Image src={logo} alt="Find a friends" fill />
            </Link>
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
