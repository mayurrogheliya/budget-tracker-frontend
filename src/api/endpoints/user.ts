import { api } from "../axios";

interface UsersDataField {
  _id: string;
  name: string;
  email: string;
  password: string;
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
};
