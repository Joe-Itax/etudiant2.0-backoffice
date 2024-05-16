import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Fab, createTheme, ThemeProvider } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import { frFR } from "@mui/x-data-grid/locales";
// import { fr as pickersFrFR } from "@mui/x-date-pickers/locales";
// import { bgBG as coreBgBG } from "@mui/material/locale";

import authAdminStatusContext from "../components/contexts/auth-admin.context";
import Loader from "./Loader/loader";
import ScrollTop from "../components/scroll-to-top/scroll-to-top";
import SideBar from "./sidebar/sidebar";
import Navbar from "./navbar/navbar";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  frFR // x-data-grid translations
  // pickersBgBG, // x-date-pickers translations
  // coreBgBG // core translations
);

export default function DashbordAdminLayout() {
  // const [loading, setLoading] = useState(false);
  const { isAdminAuthenticated } = useContext(authAdminStatusContext);

  if (isAdminAuthenticated === null) {
    return <Loader></Loader>;
  } else if (isAdminAuthenticated === false) {
    return <Navigate to={"/dashbord-admin/login"} replace={true} />;
  } else {
    return (
      <>
        <main className="">
          <SideBar navbar={<Navbar />}>
            {" "}
            <ThemeProvider theme={theme}>
              <Outlet />
            </ThemeProvider>
          </SideBar>
        </main>
        <ScrollTop>
          {" "}
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUp />
          </Fab>
        </ScrollTop>
      </>
    );
  }
}
