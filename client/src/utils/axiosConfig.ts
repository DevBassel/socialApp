import { AxiosRequestConfig } from "axios";
import { store } from "../store";
export const AxiosConfig: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${store.getState().auth.userData?.access_token}`,
  },
};
