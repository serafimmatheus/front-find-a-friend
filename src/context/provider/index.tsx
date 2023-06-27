import React, { createContext } from "react";
import { AuthProvider } from "./auth";
import PetsProviders from "./pets";

interface IPropsChildren {
  children: React.ReactNode;
}

const AllProvider = createContext({});

export const Provider = ({ children }: IPropsChildren) => {
  return (
    <AllProvider.Provider value={{}}>
      <AuthProvider>
        <PetsProviders>{children}</PetsProviders>
      </AuthProvider>
    </AllProvider.Provider>
  );
};
