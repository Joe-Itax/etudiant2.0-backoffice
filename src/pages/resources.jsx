import { useEffect, useContext } from "react";
import DisplayRessources from "../components/ressource-detail/display-ressources";
import usersContext from "../components/contexts/users.context";
import universityContext from "../components/contexts/university.context";
import ressourceContext from "../components/contexts/ressource.context";
import {
  getAllResources,
  getAllUsers,
  getAllUniversities,
} from "../components/get-datas/get-data";

export default function Resources() {
  const { users, setUsers } = useContext(usersContext);
  const { university, setUniversity } = useContext(universityContext);
  const { setRessource, ressource } = useContext(ressourceContext);

  useEffect(() => {
    if (!ressource.length > 0) {
      getAllResources().then((res) => {
        setRessource(res.allResources);
      });
    }
  }, [ressource]);

  useEffect(() => {
    if (!users.length > 0) {
      getAllUsers().then((res) => {
        setUsers(res.allUsers);
      });
    }
  }, [users]);
  useEffect(() => {
    if (!university.length > 0) {
      getAllUniversities().then((res) => {
        setUniversity(res.allUniversities);
      });
    }
  }, [university]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="ressources-page">
      <DisplayRessources />
    </div>
  );
}
