import axios from "axios"

export const makeRequest = axios.create({
    //baseURL: "https://poststation-api-391b2ced2a59.herokuapp.com/api/",
    baseURL: "http://server.postsstation.com/api/",
    //baseURL: "http://localhost:8800/api/",
    withCredentials: true,
});