import axios from 'axios'

export const api = axios.create({
  // baseURL: "https://api-find-a-friends.vercel.app/api/v1/",
  baseURL: 'http://localhost:5555/api/v1/',
})
