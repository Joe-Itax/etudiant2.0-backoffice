import { createContext } from "react";

const adminUserContext = createContext({
  adminUser: {},
  setAdminUser: () => {},
});

export default adminUserContext;
