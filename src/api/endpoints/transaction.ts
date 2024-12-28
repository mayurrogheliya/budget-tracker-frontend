import { api } from "../axios";

interface Transaction {
  type: string;
  amount: number;
  description: string;
  date: string;
}

interface ApiResponse {
  transaction: [];
  statusCode: number;
  message: string;
}

export const transactionAPI = {
  getAll: async (params: {
    search?: string;
  }): Promise<ApiResponse<Transaction[]>> => {
    return api.get("/transactions", { params });
  },

  create: async (
    transaction: Transaction
  ): Promise<ApiResponse<Transaction>> => {
    return api.post("/transactions", transaction);
  },

  update: async (
    id: string,
    transaction: Transaction
  ): Promise<ApiResponse<Transaction>> => {
    return api.put(`/transactions/${id}`, transaction);
  },

  delete: async (id: string): Promise<ApiResponse<Transaction>> => {
    return api.delete(`/transactions/${id}`);
  },

  getAnalytics: async (): Promise<ApiResponse<Transaction[]>> => {
    return api.get("/transactions/list");
  },
};
