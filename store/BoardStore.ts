import { create } from 'zustand';
import {getTodosGroupedByColumn} from "@/lib/getTodosGroupedByColumn";
import {Board, Column1, Todo, TypedColumn} from "@/typings";
import {databases} from "@/appwrite";

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo:Todo, column:TypedColumn) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column1>()
  },
  getBoard: async()=>{
  const board = await getTodosGroupedByColumn();
    set({ board })
  },
  setBoardState: (board: Board) => {
    set({ board })
  },
  updateTodoInDB: async (todo, columnId) => {
    await databases.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLECTION_ID!,
        todo.$id,
        {
          title: todo.title,
          status: columnId,
        }
    )
  }
}));