import { useRecoilState } from "recoil";
import { categories, ITodo, todoState } from "../atom";

function Todo({ id, text, category }: ITodo) {
  const [todos, setTodos] = useRecoilState(todoState);
  const onClick = (event: React.FormEvent<HTMLButtonElement>) => {
    const targerIdx = todos.findIndex((todo) => todo.id === id);
    const {
      currentTarget: { name },
    } = event;
    setTodos((prev) => {
      const copiedTodos = [...prev];
      copiedTodos.splice(targerIdx, 1, { id, text, category: name });
      return copiedTodos;
    });
  };
  const onDelete = (event: React.FormEvent<HTMLButtonElement>) => {
    const targetIdx = todos.findIndex((item) => item.id === id);
    setTodos((prev) => {
      const copiedTodos = [...prev];
      copiedTodos.splice(targetIdx, 1);
      return copiedTodos;
    });
  };

  return (
    <>
      <li>{text}</li>
      {category !== categories.TO_DO ? (
        <button onClick={onClick} name={categories.TO_DO}>
          To Do
        </button>
      ) : null}
      {category !== categories.DOING ? (
        <button onClick={onClick} name={categories.DOING}>
          Doing
        </button>
      ) : null}
      {category !== categories.DONE ? (
        <button onClick={onClick} name={categories.DONE}>
          Done
        </button>
      ) : null}
      <button onClick={onDelete}>삭제</button>
    </>
  );
}

export default Todo;
