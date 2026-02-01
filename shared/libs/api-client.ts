import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "../constants/variables";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(async (config) => {
  const session = await SecureStore.getItemAsync("SESSION");
  if (session) {
    config.headers.Authorization = `Bearer ${session}`;
  }
  return config;
});

export default apiClient;
