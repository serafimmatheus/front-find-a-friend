import { HeaderProfile } from "@/components/HeaderProfile";
import MyInput from "@/components/MyInput";
import RoutePrivate from "@/components/routePrivates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/hooks/useAuthProvider";
import { api } from "@/data/api";
import { saveUser } from "@/https/saveUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const schemaRegisterForm = z.object({
	nome: z
		.string()
		.min(3, {
			message: "Nome deve ter no mínimo 3 caracteres",
		})
		.max(255, {
			message: "Nome deve ter no máximo 255 caracteres",
		}),
	organizacao: z
		.string()
		.min(3, {
			message: "Nome da organização deve ter no mínimo 3 caracteres",
		})
		.max(255, {
			message: "Nome da organização deve ter no máximo 255 caracteres",
		}),
	email: z.string().email(),
	cep: z
		.string()
		.min(8, {
			message: "CEP deve ter no mínimo 8 caracteres",
		})
		.max(8, {
			message: "CEP deve ter no máximo 8 caracteres",
		}),
	estado: z
		.string()
		.min(2, {
			message: "Estado deve ter no mínimo 2 caracteres",
		})
		.max(2, {
			message: "Estado deve ter no máximo 2 caracteres",
		}),
	cidade: z.string(),
	endereco: z.string(),
	whatsapp: z
		.string()
		.min(11, {
			message: "Whatsapp deve ter no mínimo 11 caracteres",
		})
		.max(12, {
			message: "Whatsapp deve ter no máximo 12 caracteres",
		}),
});

type IPropsRegisterForm = z.infer<typeof schemaRegisterForm>;

export default function Profile() {
	const { usuario } = useAuthContext();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IPropsRegisterForm>({
		resolver: zodResolver(schemaRegisterForm),
		defaultValues: {
			nome: usuario.nome,
			organizacao: usuario.organizacao,
			email: usuario.email,
			cep: usuario.cep,
			estado: usuario.estado,
			cidade: usuario.cidade,
			endereco: usuario.endereco,
			whatsapp: usuario.whatsapp,
		},
	});

	const { mutateAsync: saveUserFn, isPending } = useMutation({
		mutationFn: saveUser,

		onSuccess: () => {
			alert("Usuário salvo com sucesso");
		},
	});

	async function handleSaveUser(data: IPropsRegisterForm) {
		await saveUserFn({ id: usuario.id, data: data });
	}

	return (
		<>
			<Head>
				<title>{usuario.nome} | Find a friend</title>
			</Head>
			<RoutePrivate>
				<HeaderProfile />
				<div className="bg-red-200 w-full h-full">
					<div className="grid grid-cols-5 gap-5 max-w-7xl px-5 m-auto pt-32 pb-4 md:pb-12 ">
						<div className="col-span-5 md:col-span-2">
							<h2 className="font-nunito text-5xl text-gray-400">
								Minha conta
							</h2>
						</div>

						<form
							onSubmit={handleSubmit(handleSaveUser)}
							className="flex flex-col w-full col-span-5 md:col-span-3"
						>
							<div className="w-full flex flex-col gap-5">
								<div className="flex flex-col gap-2">
									<Label htmlFor="Nome">Nome</Label>

									<Input
										placeholder="Nome"
										className="h-11 border border-gray-400"
										defaultValue={usuario.nome}
										{...register("nome")}
									/>

									{errors.nome && (
										<span className="text-red-400 font-nunito text-xs">
											{errors.nome?.message}
										</span>
									)}
								</div>

								<div className="flex flex-col gap-2">
									<Label htmlFor="organizacao">Organização</Label>

									<Input
										placeholder="Organização"
										className="h-11 border border-gray-400"
										defaultValue={usuario.organizacao}
										{...register("organizacao")}
									/>

									{errors.organizacao && (
										<span className="text-red-400 font-nunito text-xs">
											{errors.organizacao?.message}
										</span>
									)}
								</div>

								<div className="flex flex-col gap-2">
									<Label htmlFor="email">E-mail</Label>

									<Input
										disabled
										placeholder="E-mail"
										className="h-11 border border-gray-400"
										defaultValue={usuario.email}
										{...register("email")}
									/>
								</div>

								<div className="flex flex-col gap-2">
									<Label htmlFor="cep">CEP</Label>

									<Input
										placeholder="CEP"
										className="h-11 border border-gray-400"
										defaultValue={usuario.cep}
										{...register("cep")}
									/>

									{errors.cep && (
										<span className="text-red-400 font-nunito text-xs">
											{errors.cep?.message}
										</span>
									)}
								</div>

								<div className="flex flex-col gap-2">
									<Label htmlFor="estado">Estado</Label>

									<Input
										placeholder="Estado"
										className="h-11 border border-gray-400"
										defaultValue={usuario.estado}
										{...register("estado")}
									/>

									{errors.estado && (
										<span className="text-red-400 font-nunito text-xs">
											{errors.estado?.message}
										</span>
									)}
								</div>

								<div className="flex flex-col gap-2">
									<Label htmlFor="cidade">Cidade</Label>

									<Input
										placeholder="Cidade"
										className="h-11 border border-gray-400"
										defaultValue={usuario.cidade}
										{...register("cidade")}
									/>

									{errors.cidade && (
										<span className="text-red-400 font-nunito text-xs">
											{errors.cidade?.message}
										</span>
									)}
								</div>

								<div className="flex flex-col gap-2">
									<Label htmlFor="endereco">Endereço</Label>

									<Input
										placeholder="Endereço"
										className="h-11 border border-gray-400"
										defaultValue={usuario.endereco}
										{...register("endereco")}
									/>

									{errors.endereco && (
										<span className="text-red-400 font-nunito text-xs">
											{errors.endereco?.message}
										</span>
									)}
								</div>

								<div className="flex flex-col gap-2">
									<Label htmlFor="whatsApp">WhatsApp</Label>

									<Input
										placeholder="WhatsApp"
										className="h-11 border border-gray-400"
										defaultValue={usuario.whatsApp}
										{...register("whatsapp")}
									/>

									{errors.whatsapp && (
										<span className="text-red-400 font-nunito text-xs">
											{errors.whatsapp?.message}
										</span>
									)}
								</div>

								<Button
									disabled={isPending}
									className="bg-red-500 h-11 text-white font-nunito text-base font-semibold hover:bg-red-400 hover:opacity-80 transition"
									type="submit"
								>
									Salvar
								</Button>
							</div>
						</form>
					</div>
				</div>
			</RoutePrivate>
		</>
	);
}
