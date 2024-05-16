import { createContext } from "react";

const authAdminStatusContext = createContext({
  isAdminAuthenticated: null,
  setAdminIsAuthenticated: () => {},
});

export default authAdminStatusContext;
