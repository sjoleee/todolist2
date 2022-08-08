import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categories, categoryState, todoSelector, todoState } from "../atom";
import Todo from "./Todo";

function TodoList() {
  const selectedTodo = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const todos = useRecoilValue(todoState);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value as categories);
  };

  return (
    <>
      <select onInput={onInput}>
        <option value={categories.TO_DO}>To Do</option>
        <option value={categories.DOING}>Doing</option>
        <option value={categories.DONE}>Done</option>
      </select>
      <ul>
        {selectedTodo.map((item) => (
          <Todo key={item.id} {...item} />
        ))}
      </ul>
    </>
  );
}

export default TodoList;
