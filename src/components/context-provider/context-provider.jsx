import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../../utils/axios-instance";

import authAdminStatusContext from "../contexts/auth-admin.context";
import adminUserContext from "../contexts/admin-user.context";
import usersContext from "../contexts/users.context";
import universityContext from "../contexts/university.context";
import ressourceContext from "../contexts/ressource.context";
import messageContext from "../contexts/message.context";

export default function ContextProvider({ children }) {
  const [isAdminAuthenticated, setAdminIsAuthenticated] = useState(null);
  const [adminUser, setAdminUser] = useState({});
  const [users, setUsers] = useState([]);
  const [university, setUniversity] = useState([]);
  const [ressource, setRessource] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get(`/api/admin/auth/status`);
        // console.log("users: ", res);
        setAdminIsAuthenticated(res.data.isAdminAuthenticated);
        setAdminUser(res.data.userAdmin);
      } catch (err) {
        console.log(
          "error lors de la récuperation du status de connection: ",
          err
        );

        setAdminIsAuthenticated(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <messageContext.Provider value={{ message, setMessage }}>
        <adminUserContext.Provider value={{ adminUser, setAdminUser }}>
          <authAdminStatusContext.Provider
            value={{ isAdminAuthenticated, setAdminIsAuthenticated }}
          >
            <usersContext.Provider value={{ users, setUsers }}>
              <ressourceContext.Provider value={{ ressource, setRessource }}>
                <universityContext.Provider
                  value={{ university, setUniversity }}
                >
                  {children}
                </universityContext.Provider>
              </ressourceContext.Provider>
            </usersContext.Provider>
          </authAdminStatusContext.Provider>
        </adminUserContext.Provider>
      </messageContext.Provider>
    </>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
