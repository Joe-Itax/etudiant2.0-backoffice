import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashbordAdminLayout from "./components/dashbord-admin-layout";
import DashbordAdmin from "./pages/dashbord-admin";
import LoginDashbord from "./pages/login-dashbord";
import ContextProvider from "./components/context-provider/context-provider";
import Users from "./pages/users";
import Universities from "./pages/universities";
import Message from "./pages/message";
import Resources from "./pages/resources";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <DashbordAdminLayout />,
    children: [
      {
        path: "/",
        element: <DashbordAdmin />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/resources",
        element: <Resources />,
      },
      {
        path: "/universities",
        element: <Universities />,
      },
      {
        path: "/message",
        element: <Message />,
      },
    ],
  },
  {
    path: "/dashbord-admin/login",
    element: <LoginDashbord />,
  },
]);
function App() {
  return (
    <ContextProvider>
      <RouterProvider router={routes} />
    </ContextProvider>
  );
}

export default App;
