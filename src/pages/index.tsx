import { SearchFriends } from "@/components/searchFriends";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import doguinhos from "../assets/dogs.png";
import logo from "../assets/logo.png";

export default function Home() {
	const route = useRouter();

	return (
		<>
			<Head>
				<title>Brasil Meu Pet</title>
				<link rel="icon" href="/mini-logo.ico" />
				<meta
					name="site-verification"
					content="ae11093bd300cc6549b2bc34d6a3220a"
				/>
			</Head>

			<script
				src="https://cdn.diclotrans.com/sdk/v1/46443/7cf9efcd5baf2581975898e9739e2c9349106b54/lib.js"
				async
			/>

			<main className="bg-background w-full h-full">
				<div className="flex flex-col h-full container justify-between">
					<header className="flex flex-col sm:flex-row gap-8 pt-10 sm:pt-4 justify-between items-center w-full">
						<div className="w-[215px] h-[56px]  ">
							<Image src={logo} alt="Logo" />
						</div>

						<div className="flex gap-4">
							<Button
								variant="outline"
								className="rounded-full border-primary text-primary"
								onClick={() => route.push("/login")}
							>
								Logar
							</Button>

							<Button
								className="rounded-full"
								onClick={() => route.push("/login?isRegister=true")}
							>
								cadastrar
							</Button>
						</div>
					</header>

					<div className="w-full pt-32 sm:flex items-end justify-center">
						<div className="sm:w-1/2 flex mb-10">
							<h1 className="text-primary font-extrabold text-2xl sm:text-7xl">
								Leve a felicidade para o seu lar
							</h1>
						</div>
						<div className="sm:w-1/2">
							<Image src={doguinhos} alt="Doguinhos amigaveis" />
						</div>
					</div>

					<div className="flex flex-col lg:flex-row pb-8 pt-28 items-center">
						<div className="flex sm:w-1/2 mb-10">
							<p className="text-primary font-semibold text-2xl w-full max-w-[407px] text-center sm:text-start">
								Encontre o animal de estimação ideal para seu estilo de vida!
							</p>
						</div>

						<div className="flex flex-col gap-4 sm:flex-row items-center sm:gap-10 justify-end w-full md:w-1/2">
							<p className="w-full sm:w-1/3 text-primary text-lg">
								Busque seu amigo:
							</p>

							<SearchFriends />
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
