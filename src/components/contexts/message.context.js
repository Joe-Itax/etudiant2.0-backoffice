import { createContext } from "react";

const messageContext = createContext({
  message: [],
  setMessage: () => {},
});

export default messageContext;
