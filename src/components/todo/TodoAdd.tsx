import { useForm } from "react-hook-form";
import styles from "./TodoAdd.module.css";
import { useDispatch } from "react-redux";
import { addTodo, fetchTodos } from "./todoSlice";

export const TodoAdd: React.FC = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  type TodoItem = {
    title: string;
    description: string;
    date: Date;
    priority: boolean;
  };

  const onSubmit = async (data: TodoItem) => {
    const result = await dispatch(addTodo(data));
    if (result.type === "todos/addTodo/fulfilled") {
      dispatch(fetchTodos());
    }
  };

  return (
    <div>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title: </label>
        <input {...register("title")} type="text" id="title" />
        <label htmlFor="description">Description: </label>
        <input {...register("description")} type="text" id="description" />
        <label htmlFor="dueDate">Due Date: </label>
        <input {...register("dueDate")} type="date" id="dueDate" />
        <label htmlFor="priority" className={styles.switch}>
          <input {...register("priority")} type="checkbox" id="priority" />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};
