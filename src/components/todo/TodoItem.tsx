import React from "react";
import styles from "./TodoItem.module.css";
import { MdDelete } from "react-icons/md";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { deleteTodo } from "./todoSlice";
import toast from "react-hot-toast";

type todo = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
};
export const TodoItem: React.FC<{ todo: todo }> = ({ todo }) => {
  const dispatch = useDispatch<AppDispatch>();

  function handleDelete() {
    dispatch(deleteTodo(todo._id))
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          toast.success("Successfully deleted");
        } else {
          toast.error("Error deleting...");
        }
      })
      .catch((er) => {
        console.log(er);
        toast.error("Error deleting...");
      });
  }

  return (
    <div className={styles.container}>
      <div>
        <ul>
          <li>{todo.title}</li>
          <li>{todo.description}</li>
        </ul>
      </div>
      <MdDelete
        size={23}
        className={styles.delete}
        color="#EE4E4E"
        onClick={handleDelete}
      />
    </div>
  );
};
