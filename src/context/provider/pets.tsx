import { api } from "@/data/api";
import { createContext, useState } from "react";

interface IPropsChildren {
  children: React.ReactNode;
}

interface IPropsPets {
  id: string;
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

interface IPropsPetsContext {
  handlePetsByCidadeAndEstado(cidade: string, estado: string): Promise<void>;
  pets: IPropsPets[];
  pet: IPropsPets;
  isLoading: boolean;
  handlePetById(id: string): Promise<void>;
}

export const PetsContext = createContext<IPropsPetsContext>(
  {} as IPropsPetsContext
);

function PetsProviders({ children }: IPropsChildren) {
  const [pets, setPets] = useState<IPropsPets[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pet, setPet] = useState<IPropsPets>({} as IPropsPets);

  async function handlePetsByCidadeAndEstado(estado: string, cidade: string) {
    setIsLoading(true);
    await api
      .get(`/pets/${estado}/${cidade}`)
      .then((response) => {
        setPets(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function handlePetById(id: any) {
    await api
      .get(`/pets/${id}`)
      .then((response) => {
        setPet(response.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {});
  }

  return (
    <PetsContext.Provider
      value={{
        handlePetsByCidadeAndEstado,
        handlePetById,
        pet,
        pets,
        isLoading,
      }}
    >
      {children}
    </PetsContext.Provider>
  );
}

export default PetsProviders;
