import axios from "axios";
export const API_CALL = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});
