import { atom, selector } from "recoil";

// export type categories = "TO_DO" | "DOING" | "DONE";
export enum categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface ITodo {
  id: number;
  text: string;
  category: string;
}

export const todoState = atom<ITodo[]>({
  key: "todo",
  default: JSON.parse(localStorage.getItem("todos") || "[]"),
});

export const categoryState = atom<categories>({
  key: "category",
  default: categories.TO_DO,
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);
    return todos.filter((item) => item.category === category);
  },
});
