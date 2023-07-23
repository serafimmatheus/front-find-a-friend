import { useAuthContext } from "@/context/hooks/useAuthProvider";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

function RoutePrivate({ children }: IProps) {
  const { usuario, token } = useAuthContext();
  const router = useRouter();
  const pathName = usePathname();

  const routesPrivates = ["/cadastro/pet", "/profile", "/profile/pets"];

  useEffect(() => {
    async function checkUser() {
      if (!usuario.id) {
        return await router.push("/login");
      } else if (usuario.id) {
        return;
      } else if (usuario.id && token && pathName === "/login") {
        return await router.push("/profile");
      }
    }

    checkUser();
  }, [usuario, token, router, pathName]);

  return (
    <>
      {!usuario.id && null}
      {usuario.id && children}
    </>
  );
}

export default RoutePrivate;
