import { api } from "../axios";

interface Transaction {
  _id: string;
  type: string;
  amount: number;
  description: string;
  date: string;
}

interface ApiResponse<T> {
  transaction?: T;
  statusCode: number;
  message: string;
}

export const transactionAPI = {
  getAll: async (params: {
    search?: string;
  }): Promise<ApiResponse<Transaction[]>> => {
    const response = await api.get("/transactions", { params });
    return response.data;
  },

  create: async (
    transaction: Transaction
  ): Promise<ApiResponse<Transaction>> => {
    const response = await api.post("/transactions", transaction);
    return response.data;
  },

  update: async (
    id: string,
    transaction: Transaction
  ): Promise<ApiResponse<Transaction>> => {
    const response = await api.put(`/transactions/${id}`, transaction);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<Transaction>> => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  },

  getAnalytics: async (): Promise<ApiResponse<Transaction[]>> => {
    const response = await api.get("/transactions/list");
    return response.data;
  },
};
