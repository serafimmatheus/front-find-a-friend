import { HeaderProfile } from "@/components/HeaderProfile";
import RoutePrivate from "@/components/routePrivates";

export default function Pets() {
  return (
    <RoutePrivate>
      <HeaderProfile />
      <div className="flex container m-auto w-full">
        <div className="flex mt-28">Pets</div>
      </div>
    </RoutePrivate>
  );
}
