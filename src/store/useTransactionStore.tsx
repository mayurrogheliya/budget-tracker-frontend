import { create } from "zustand";
import { transactionAPI } from "../api/endpoints/transaction";

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
  fetchTransactions: () => void;
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

  fetchTransactions: async () => {
    try {
      const response = await transactionAPI.getAll();
      get().setTransactions(response.data.data);
    } catch (error: any) {
      console.log(error.message);
    }
  },
}));
