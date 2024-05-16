import { createContext } from "react";

const universityContext = createContext({
  university: [],
  setUniversity: () => {},
});

export default universityContext;
