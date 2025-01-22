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
		<SheetContent className="bg-background w-full overflow-auto">
			<SheetHeader>
				<SheetTitle className="text-secondary text-start">Filtros</SheetTitle>
				<SheetDescription className="text-secondary text-start pb-8">
					Utilize os filtros abaixo para encontrar o pet ideal para você.
				</SheetDescription>
			</SheetHeader>

			<SearchFriends />

			<div className="pb-8" />

			<AdvancedFilters />
		</SheetContent>
	);
}
