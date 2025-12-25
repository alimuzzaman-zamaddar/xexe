import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_SITE_URL,
    headers: {
        Accept: "application/json",
    },
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;