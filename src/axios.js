import axios from "axios"

// const isLocalHost = window.location.hostname === "localhost";
// const isProduction = process.env.REACT_APP_IS_PRODUCTION === "true";

// const baseURL = isProduction ? "https://server.postsstation.com/api/" : 
//     isLocalHost ? "http://localhost:8800/api" : process.env.REACT_APP_NETWORK_ADDR;

// export const makeRequest = axios.create({
//     baseURL,
//     withCredentials: true,
// });

export const makeRequest = axios.create({
    baseURL: "https://server.postsstation.com/api/",
    withCredentials: true,
});
