import axios from "axios"

// const isProduction = process.env.REACT_APP_IS_PRODUCTION === "true";
const isProduction = true;

export const makeRequest = axios.create({
    baseURL: isProduction ? "https://server.postsstation.com/api/" : process.env.REACT_APP_NETWORK_ADDR,
    withCredentials: true,
});
