import { AdvancedFilters } from "@/components/AdvancedFilters";
import { Header } from "@/components/Header";
import { SheetAdvancedFilter } from "@/components/SheetAdvancedFilter";
import { SearchFriends } from "@/components/searchFriends";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { getPets } from "@/https/getPets";
import { useQuery } from "@tanstack/react-query";
import { Filter } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import celo from "../../../assets/celo.png";

interface IPropsOrganizacao {
	cep: string;
	cidade: string;
	email: string;
	endereco: string;
	estado: string;
	nome: string;
	organizacao: string;
	whatsapp: string;
}

interface IPropsPets {
	id: string;
	coverImage: string;
	ambiente: string;
	gatoOuCachorro: string;
	idade: string;
	nivelEnergia: string;
	nivelIndependencia: string;
	nome: string;
	porte: string;
	sobre: string;
	petId: IPropsOrganizacao;
}

export default function Amigos() {
	const route = useRouter();

	const estado = route.query.estado as string;
	const cidade = route.query.cidade as string;

	const { data: pets } = useQuery({
		queryKey: ["pets", estado, cidade],
		queryFn: () => getPets({ cidade, estado }),
	});

	return (
		<>
			<Head>
				<title>{estado} {cidade} | Brasil Meu Pet</title>
			</Head>
			<Header />
			<main className="bg-card w-full min-h-screen grid grid-cols-5">
				<div className="hidden xl:flex xl:col-span-1 flex-col w-full h-full bg-card-foreground">
					<div className="bg-card py-16 flex flex-col px-5">
						<div className="flex pt-20">
							<SearchFriends />
						</div>
					</div>

					<h2 className="text-secondary font-nunito font-extrabold text-xl px-5 py-8">
						Filtros
					</h2>

					<AdvancedFilters />
				</div>

				<div className="col-span-5 xl:col-span-4 bg-gray-100 w-full h-full px-5">
					<div className="flex flex-col sm:flex-row gap-5 justify-between items-center pt-40">
						<h1 className="font-nunito text-xl font-normal text-gray-400">
							Encontre <b>{pets?.length ?? 0}</b> amigo(s) na sua cidade.
						</h1>

						<div className="flex items-center gap-6">
							<select className="h-11 bg-red-200 rounded-md px-4 optional:text-gray-400 optional:text-base optional:font-nunito optional:font-normal outline-none">
								<option value="1">Todos</option>
								<option value="2">Gatos</option>
								<option value="3">Cachorros</option>
							</select>

							<Sheet>
								<SheetTrigger asChild>
									<Button
										className="h-11 px-0 py-0 hover:bg-transparent"
										variant="ghost"
									>
										<Filter className="xl:hidden" size={24} />
									</Button>
								</SheetTrigger>

								<SheetAdvancedFilter />
							</Sheet>
						</div>
					</div>

					<ul className="gap-5 overflow-auto mt-8 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
						{pets?.length > 0 ? (
							pets?.map((elem: IPropsPets) => {
								return (
									<li
										key={elem.id}
										className="w-full h-72 bg-white relative rounded-3xl cursor-pointer text-gray-400 hover:text-white hover:bg-gray-400"
									>
										<Link href={`/amigos/detalhes/${elem.id}`}>
											<div className="p-[2px] w-full h-[210px] relative">
												<Image
													className="rounded-3xl object-cover"
													src={elem.coverImage}
													fill
													alt="imagens dos pets"
												/>
											</div>

											{elem.gatoOuCachorro === "gato" ? (
												<div className="flex justify-center items-center w-11 h-11 bg-red-500 rounded-lg border-white border-[2px] absolute top-48 left-1/2 -translate-x-1/2">
													<Image src={celo} alt="celo" />
												</div>
											) : (
												<div className="flex justify-center items-center w-11 h-11 bg-green-400 rounded-lg border-white border-[2px] absolute top-48 left-1/2 -translate-x-1/2">
													<Image src={celo} alt="celo" />
												</div>
											)}

											<div className="mt-8 text-center">
												<h4 className="text-lg font-nunito font-bold">
													{elem.nome}
												</h4>
											</div>
										</Link>
									</li>
								);
							})
						) : (
							<div className="flex w-full h-1/2 border border-dashed mt-8 items-center justify-center animate-pulse">
								<p className="text-2xl text-gray-400 font-nunito font-semibold">
									Não encontramos nenhum pet na sua região
								</p>
							</div>
						)}
					</ul>
				</div>
			</main>
		</>
	);
}
