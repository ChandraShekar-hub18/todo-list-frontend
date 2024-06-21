import { Footer } from "../../ui/Footer";
import { Header } from "../../ui/Header";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../../components/Sidebar";
import styles from "./TodoList.module.css";
import { fetchTodos } from "./todoSlice";
import { useEffect } from "react";
import { Loading } from "../../ui/Loading";
import { RootState } from "@reduxjs/toolkit/query";
//import { TodoItem } from "../../components/todo/TodoItem";
import { AppDispatch } from "../../store/store";
import { TodoItem } from "../../components/todo/TodoItem";

export const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
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
    id: number;
    title: string;
    description: string;
    completed: boolean;
  }

  return (
    <>
      <Header></Header>
      <main className={styles.container}>
        <Sidebar></Sidebar>
        <section className={styles.projectSection}>
          <input />
          {todos.todos?.map((todo: todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </section>
      </main>

      <Footer></Footer>
    </>
  );
};
