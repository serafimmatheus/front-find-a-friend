import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
  headers: {
    'Content-Type': 'application/json',
    'access-control-allow-origin': '*',
  },
})
