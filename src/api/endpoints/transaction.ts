import { api } from "../axios";

interface Transaction {
  type: string;
  amount: number;
  description: string;
  date: string;
}

interface ApiResponse<T> {
  data: T;
  statusCode: number;
  message: string;
}

export const transactionAPI = {
  getAll: async (params: string): Promise<ApiResponse<Transaction[]>> => {
    return api.get("/transactions", { params });
  },

  create: async (data: Transaction): Promise<ApiResponse<Transaction>> => {
    return api.post("/transactions", data);
  },

  update: async (
    id: string,
    data: Transaction
  ): Promise<ApiResponse<Transaction>> => {
    return api.put(`/transactions/${id}`, data);
  },

  delete: async (id: string): Promise<ApiResponse<Transaction>> => {
    return api.delete(`/transactions/${id}`);
  },

  getAnalytics: async (): Promise<ApiResponse<Transaction[]>> => {
    return api.get("/transactions/list");
  },
};
