import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

const formSchemaFilters = z.object({
	age: z.enum(["filhote", "adulto"]),
	power: z.enum(["pouca", "media", "muita"]),
	size: z.enum(["pequeno", "medio", "grande"]),
	level: z.enum(["baixo", "medio", "alto"]),
});

type FormSchemaFilters = z.infer<typeof formSchemaFilters>;

export function AdvancedFilters() {
	const form = useForm<FormSchemaFilters>({
		resolver: zodResolver(formSchemaFilters),
	});

	function onSubmit(data: FormSchemaFilters) {
		console.log(data);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col flex-1 gap-8 px-5"
			>
				<FormField
					control={form.control}
					name="age"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-white">Idade</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl className="text-white">
									<SelectTrigger>
										<SelectValue placeholder="Selecione uma idade" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="filhote">Filhote</SelectItem>
									<SelectItem value="adulto">Adulto</SelectItem>
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="power"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-white">Idade</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl className="text-white">
									<SelectTrigger>
										<SelectValue placeholder="Selecione uma energia" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="pouca">Pouca energia</SelectItem>
									<SelectItem value="media">Média energia</SelectItem>
									<SelectItem value="muita">Muita energia</SelectItem>
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="size"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-white">Porte do animal</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl className="text-white">
									<SelectTrigger>
										<SelectValue placeholder="Selecione uma tamanho" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="pequeno">Pequeno</SelectItem>
									<SelectItem value="medio">Médio</SelectItem>
									<SelectItem value="grande">Grande</SelectItem>
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="level"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-white">
								Nível de independência
							</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl className="text-white">
									<SelectTrigger>
										<SelectValue placeholder="Selecione um nivel" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="baixo">Baixo</SelectItem>
									<SelectItem value="medio">Médio</SelectItem>
									<SelectItem value="alto">Independente</SelectItem>
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="bg-yellow text-black hover:bg-yellow/80"
				>
					<Search size={20} />
					Buscar
				</Button>
			</form>
		</Form>
	);
}
