import axiosInstance from "../../utils/axios-instance";

const getAllUsers = async () => {
  try {
    const res = await axiosInstance.get("/api/admin/users");
    // console.log("users: ", res.data);
    return res.data;
  } catch (error) {
    console.log("error lors de la recuperation des utilisateurs: ", error);
  }
};

const getAllUniversities = async () => {
  try {
    const res = await axiosInstance.get("/api/admin/universities");
    // console.log("universities: ", res.data);
    return res.data;
  } catch (error) {
    console.log("error lors de la recuperation des universites: ", error);
  }
};

const getAllResources = async () => {
  try {
    const res = await axiosInstance.get("/api/admin/resources");
    return res.data;
  } catch (error) {
    console.log("error lors de la recuperation des ressources: ", error);
  }
};
export { getAllUsers, getAllUniversities, getAllResources };
