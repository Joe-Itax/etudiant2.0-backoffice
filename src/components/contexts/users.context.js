import { createContext } from "react";

const usersContext = createContext({
  users: {},
  setUsers: () => {},
});

export default usersContext;
