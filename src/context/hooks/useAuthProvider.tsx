import { useContext } from "react";
import { AuthContext } from "../provider/auth";

export const useAuthContext = () => useContext(AuthContext);
