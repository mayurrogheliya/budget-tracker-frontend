import { api } from "../axios";

interface UsersDataField {
  _id: string;
  name: string;
  email: string;
  password: string;
  accessToken: string;
  message: string;
}

interface UserResponse<T> {
  data: T;
  statusCode: number;
  message: string;
}

export const userAPI = {
  create: async (
    data: UsersDataField
  ): Promise<UserResponse<UsersDataField>> => {
    return await api.post("/users", data);
  },

  login: async (
    data: UsersDataField
  ): Promise<UserResponse<UsersDataField>> => {
    const response = await api.post("/users/login", data);
    return response.data;
  },

  logout: async () => {
    return await api.post("/users/logout");
  },

  verifyEmail: async (token: string) => {
    return await api.get(`/users/verify-email/${token}`);
  },

  forgotPassword: async (email: string) => {
    return await api.post(`/users/forgot-password`, email);
  },

  resetPassword: async (token: string | undefined, password: string) => {
    return await api.post(`/users/reset-password/${token}`, password);
  },
};
