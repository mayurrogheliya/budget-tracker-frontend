import { create } from "zustand";
import { transactionAPI } from "../api/endpoints/transaction";
import { message } from "antd";

interface Transaction {
  _id: string;
  type: string;
  amount: number;
  description: string;
  date: string;
}

interface TransactionState {
  mode: string;
  setMode: (mode: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  editingTransactions: Transaction | null;
  setEditingTransactions: (transaction: Transaction | null) => void;
  searchText: string;
  fetchTransactions: (searchText?: string) => void;
  setSearchText: (searchText: string) => void;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  mode: "table",
  setMode: (mode: string) => set({ mode }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  transactions: [],
  setTransactions: (transactions) => set({ transactions }),
  editingTransactions: null,
  setEditingTransactions: (transaction) =>
    set({ editingTransactions: transaction }),
  searchText: "",
  setSearchText: (searchText) => set({ searchText }),

  fetchTransactions: async (search) => {
    try {
      const response = await transactionAPI.getAll({ search });
      get().setTransactions(response.data);
    } catch (error: any) {
      message.error(error?.response?.data?.message);
    }
  },
}));
