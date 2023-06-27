import React, { createContext } from "react";
import { AuthProvider } from "./auth";

interface IPropsChildren {
  children: React.ReactNode;
}

const AllProvider = createContext({});

export const Provider = ({ children }: IPropsChildren) => {
  return (
    <AllProvider.Provider value={{}}>
      <AuthProvider>{children}</AuthProvider>
    </AllProvider.Provider>
  );
};
