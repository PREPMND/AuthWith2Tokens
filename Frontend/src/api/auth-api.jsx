import api from "./verifyJWT-apicalls";

export const registerUser = async (payload) => {
    const { data } = await api.post("/users/register", payload);
    return data;
};
export const loginUser = async (payload) => {
    const { data } = await api.post("/users/login", payload);
    return data;
};
export const logoutUser = async () => {
    const { data } = await api.post("/users/logout");
    return data;
};
export const refreshAccessToken = async () => {
    const { data } = await api.post("/users/refreshtoken");
    return data;
};
export const getCurrentUser = async () => {
    const { data } = await api.get("/users/currentuser");
        
    return data;
};