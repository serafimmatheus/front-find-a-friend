import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5555/api/v1/",
});
