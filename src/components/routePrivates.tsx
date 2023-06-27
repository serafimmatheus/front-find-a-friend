import { useAuthContext } from "@/context/hooks/useAuthProvider";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

function RoutePrivate({ children }: IProps) {
  const { usuario } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (usuario?.id) {
      router.push("/cadastro/pet");
    } else {
      router.push("/login");
    }
  }, [router, usuario?.id]);

  return <>{children}</>;
}

export default RoutePrivate;
