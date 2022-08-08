import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, todoState } from "../atom";

interface IForm {
  todo: string;
}

function CreateTodo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [todos, setTodos] = useRecoilState(todoState);
  const category = useRecoilValue(categoryState);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onValid = (data: IForm) => {
    setTodos((prev) => [
      { id: Date.now(), text: data.todo, category },
      ...prev,
    ]);
    setValue("todo", "");
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("todo", { required: "입력해주세요" })}
        placeholder="할 일을 적어주세요"
      ></input>
      <button>등록</button>
    </form>
  );
}

export default CreateTodo;
