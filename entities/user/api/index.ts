import apiClient from "@/shared/libs/api-client";
import { User } from "../types";

export const UserApi = {
  get: async () => {
    return await apiClient.get<User>("/auth/profile");
  },

  logout: async () => {
    return await apiClient.post("/auth/logout");
  },
};
