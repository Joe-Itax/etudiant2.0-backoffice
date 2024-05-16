import { createContext } from "react";

const ressourceContext = createContext({
  ressource: [],
  setRessource: () => {},
});

export default ressourceContext;
