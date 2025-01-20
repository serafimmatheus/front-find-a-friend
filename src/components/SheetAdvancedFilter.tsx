import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { AdvancedFilters } from "./AdvancedFilters";
import { SearchFriends } from "./searchFriends";

export function SheetAdvancedFilter() {
	return (
		<SheetContent className="bg-red-500 w-full">
			<SheetHeader>
				<SheetTitle className="text-white">Filtros</SheetTitle>
				<SheetDescription className="text-white pb-8">
					Utilize os filtros abaixo para encontrar o pet ideal para você.
				</SheetDescription>
			</SheetHeader>

			<SearchFriends />

			<div className="pb-8" />

			<AdvancedFilters />
		</SheetContent>
	);
}
