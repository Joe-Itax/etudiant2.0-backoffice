import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../../utils/axios-instance";

import authAdminStatusContext from "../contexts/auth-admin.context";
import usersContext from "../contexts/users.context";
import universityContext from "../contexts/university.context";
import ressourceContext from "../contexts/ressource.context";
import {
  getAllUsers,
  getAllUniversities,
  getAllResources,
} from "../get-datas/get-data";

export default function ContextProvider({ children }) {
  const [isAdminAuthenticated, setAdminIsAuthenticated] = useState(null);
  const [users, setUsers] = useState([]);
  const [university, setUniversity] = useState([]);
  const [ressource, setRessource] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get(`/api/admin/auth/status`);
        // console.log("users: ", res);
        setAdminIsAuthenticated(res.data.isAdminAuthenticated);
        // setUsers(res.data.allUsers);
        // setUniversity(res.data.allUniversities);
        // setRessource(res.data.allRessources);
      } catch (err) {
        console.log(
          "error lors de la récuperation du status de connection: ",
          err
        );

        setAdminIsAuthenticated(false);
      }
      getAllUniversities().then((data) => setUniversity(data.allUniversities));
    };
    getData();
  }, []);

  return (
    <>
      <authAdminStatusContext.Provider
        value={{ isAdminAuthenticated, setAdminIsAuthenticated }}
      >
        <usersContext.Provider value={{ users, setUsers }}>
          <ressourceContext.Provider value={{ ressource, setRessource }}>
            <universityContext.Provider value={{ university, setUniversity }}>
              {children}
            </universityContext.Provider>
          </ressourceContext.Provider>
        </usersContext.Provider>
      </authAdminStatusContext.Provider>
    </>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
