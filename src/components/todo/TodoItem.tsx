import React from "react";
import styles from "./TodoItem.module.css";
type todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};
export const TodoItem: React.FC<{ todo: todo }> = ({ todo }) => {
  return (
    <div className={styles.container}>
      <div>{todo.title}</div>
      <div>{todo.description}</div>
    </div>
  );
};
