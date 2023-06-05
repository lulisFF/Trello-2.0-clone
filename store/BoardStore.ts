import { create } from 'zustand';
import {getTodosGroupedByColumn} from "@/lib/getTodosGroupedByColumn";
import {Board, Column, TypedColumn} from "@/typings";

interface BoardState {
  board: Board;
  getBoard: () => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>()
  },
  getBoard: async()=>{
  const board = await getTodosGroupedByColumn();
    set({ board })
  },
}));