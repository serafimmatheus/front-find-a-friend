"use client";
import Image from "next/image";

import { useAuthContext } from "@/context/hooks/useAuthProvider";
import Link from "next/link";
import logo from "../assets/logo.png";

export function Header() {
	const { usuario } = useAuthContext();

	return (
		<header className="w-full min-h-24 bg-card border-b border-secondary fixed z-50">
			<div className="w-full h-full px-4 sm:px-5">
				<div className="flex flex-col py-4 gap-2 sm:flex-row justify-between w-full h-full items-center">
					<div className="w-[215px] h-[56px] relative items-center">
						<Image src={logo} alt="Brasil Meu Pets" fill />
					</div>

					<ul className="flex items-center gap-4">
						<li
							className="font-nunito text-base text-secondary font-semibold cursor-pointer"
							
						>
							<Link href="/">
								Home
							</Link>
						</li>

						{usuario.id ? (
							<li
								className="font-nunito text-base text-secondary font-semibold cursor-pointer"
							>
								<Link href="/profile">
									Profile
								</Link>
							</li>
						) : (
							<li
								className="font-nunito text-base text-secondary font-semibold cursor-pointer"
							>
								<Link href="/login">
									Login
								</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
		</header>
	);
}
