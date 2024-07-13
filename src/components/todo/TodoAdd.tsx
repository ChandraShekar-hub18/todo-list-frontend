import { useForm } from "react-hook-form";
import styles from "./TodoAdd.module.css";
import { useDispatch } from "react-redux";
import { addTodo } from "./todoSlice";

export const TodoAdd: React.FC = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <form
        className={styles.container}
        onSubmit={handleSubmit((data) => dispatch(addTodo(data)))}
      >
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
