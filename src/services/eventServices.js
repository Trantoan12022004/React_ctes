import axios from "axios";
const createEvent = (data) => {
    return axios.post(`http://localhost:2004/api/event/create`, data);
};
const createEventDescription = (data) => {
    return axios.post(`http://localhost:2004/api/event-description/create`, data);
};
const getAllEvents = () => {
    return axios.get(`http://localhost:2004/api/events/get-all`);
};
const getRecentEvents = () => {
    return axios.get(`http://localhost:2004/api/events/get-recent`);
};

// nhớ sửa lại
const registerEvent = (data) => {
    return axios.post(`http://localhost:2004/api/event/register`, data);
};

const getEventById = (id) => {
    return axios.get(`http://localhost:2004/api/event/${id}`);
};
const getEventRegistrationsById = (id) => {
    return axios.get(`http://localhost:2004/api/events/registrations/${id}`);
};
const updateEventRegistration = (data) => {
    return axios.post(`http://localhost:2004/api/events/registration-update`, data);
};
const deleteEventRegistration = (data) => {
    return axios.post(`http://localhost:2004/api/events/registration-delete`, data);
};

// router.post("/api/events/registration/:id", eventController.updateEventRegistration);
export {
    createEvent,
    createEventDescription,
    getAllEvents,
    getRecentEvents,
    registerEvent,
    getEventById,
    getEventRegistrationsById,
    updateEventRegistration,
    deleteEventRegistration,
};
