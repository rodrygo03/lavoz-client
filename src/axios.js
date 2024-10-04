import axios from "axios"

export const makeRequest = axios.create({
    //baseURL: "https://server.postsstation.com/api/",
    baseURL: "http://localhost:8800/api/",
    withCredentials: true,
});