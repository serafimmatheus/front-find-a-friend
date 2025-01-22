"use client";
import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/router";
import logo from "../assets/logo.png";

export function HeaderProfile() {
  const router = useRouter();

  return (
    <header className="w-full h-auto sm:h-24 bg-card fixed z-50">
      <div className="w-full h-full max-w-[1440px] mx-auto px-5 py-3">
        <div className="flex flex-col gap-4 sm:flex-row justify-between w-full h-full items-center">
          <div className="w-[215px] h-[56px] relative items-center">
            <Link href="/">
              <Image src={logo} alt="Brasil Meu Pets" fill />
            </Link>
          </div>

          <ul className="flex items-center gap-4">
            <li
              className="font-nunito text-base text-secondary font-semibold cursor-pointer"
            >
              <Link href="/">
                Home
              </Link>
            </li>

            <li
              className="font-nunito text-base text-secondary font-semibold cursor-pointer"
            >
              <Link href="/cadastro/pet">
                Cadastros
              </Link>
            </li>
            <li
              className="font-nunito text-base text-secondary font-semibold cursor-pointer"
            >
              <Link href="/profile/pets">
                Pets
              </Link>
              
            </li>

            <li
              className="font-nunito text-base text-secondary font-semibold cursor-pointer"
            >
              <Link href="/profile">
                Conta
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
