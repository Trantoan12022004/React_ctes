// services/userServices.js
import axios from "axios";

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post("http://localhost:2004/api/login", {
        email: userEmail,
        password: userPassword,
    });
};









const getAllCodeService = (type) => {
    return axios.get(`http://localhost:2004/allcode?type=${type}`);
};

const getTopDoctorsService = () => {
    return axios.get(`http://localhost:2004/api/get-all-doctors`);
}

const createMarkdown = (data) => {
    return axios.post(`http://localhost:2004/api/create-markdown`, data)
}
const getDoctorDetailService = (id) => {
    return axios.get(`http://localhost:2004/api/get-detail-doctor-by-id?id=${id}`);
};

export { handleLoginApi };
export {  getDoctorDetailService,createMarkdown, getAllCodeService, getTopDoctorsService };


// =========================================================================================
const getAllCodes = () => {
    return axios.get(`http://localhost:2004/api/allcode/get-all`);
}
const createUser = (data) => {
    return axios.post(`http://localhost:2004/api/user/create`, data)
}

const getAllUsers = () => {
    return axios.get(`http://localhost:2004/api/users/get-all`);
};

const updateUser = (data) => {
    return axios.post(`http://localhost:2004/api/user/update`, data);
};

const deleteUser = (userId) => {
    return axios.post(`http://localhost:2004/api/user/delete`, { id: userId });
};
export { 
    getAllCodes,
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
 };