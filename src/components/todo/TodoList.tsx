import { Footer } from "../../ui/Footer";
import { Header } from "../../ui/Header";
import { useDispatch, useSelector } from "react-redux";

import styles from "./TodoList.module.css";
// import { useEffect } from "react";
import { Loading } from "../../ui/Loading";
import { RootState } from "@reduxjs/toolkit/query";

import { AppDispatch } from "../../store/store";
import { TodoItem } from "./TodoItem";
import { fetchTodos } from "./todoSlice";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { TodoAdd } from "./TodoAdd";

export const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isAddTodo, setIsAddTodo] = useState(false);

  const { todos, loading, error } = useSelector(
    (state: RootState) => state.todos
  );

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  interface todo {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
  }

  function handleAddTodo(): void {
    setIsAddTodo((s) => !s);
  }

  return (
    <>
      <Header></Header>
      <main className={styles.container}>
        <Toaster position="top-center" reverseOrder={false} />
        <section className={styles.projectSection}>
          <button className={styles.add} onClick={() => handleAddTodo()}>
            ➕Add
          </button>
          {isAddTodo && <TodoAdd />}
          {todos.todos?.map((todo: todo, index: number) => (
            <TodoItem key={index} todo={todo} />
          ))}
        </section>
      </main>

      <Footer></Footer>
    </>
  );
};
