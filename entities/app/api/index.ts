import apiClient from "@/shared/libs/api-client";
import { App } from "../types";

export const AppApi = {
  get: async () => {
    return await apiClient.get<App[]>("/apps");
  },
};
