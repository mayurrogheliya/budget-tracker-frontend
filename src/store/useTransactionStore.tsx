import { create } from "zustand";

interface TransactionState {
  mode: string;
  setMode: (mode: string) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  mode: "table",
  setMode: (mode: string) => set({ mode }),
}));
