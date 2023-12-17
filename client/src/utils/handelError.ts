import axios from "axios";

export const handleAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data.message) {
      return error.response.data;
    } else {
      return error.message;
    }
  }

  return "An unexpected error occurred";
};
