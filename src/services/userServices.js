// services/userServices.js
import axios from "axios";

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post("http://localhost:2004/api/login", {
        email: userEmail,
        password: userPassword,
    });
};

const getAllUsers = (inputId) => {
    return axios.get(`http://localhost:2004/api/get-all-users?id=${inputId}`);
};

const deleteUser = (userId) => {
    return axios.post(`http://localhost:2004/api/delete-user`, { id: userId });
};

const updateUser = (data) => {
    return axios.post(`http://localhost:2004/api/update-user`, data);
};

const createUser = (data) => {
    console.log("Sending to API:", data);
    return axios.post(`http://localhost:2004/api/create-user`, data);
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
export { getAllUsers, deleteUser,getDoctorDetailService, updateUser, createUser,createMarkdown, getAllCodeService, getTopDoctorsService };
