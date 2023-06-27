import { useContext } from "react";
import { PetsContext } from "../provider/pets";

export const usePets = () => useContext(PetsContext);
