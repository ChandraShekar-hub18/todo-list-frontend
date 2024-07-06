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
import { useEffect } from "react";

export const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
   
  const { todos, loading, error } = useSelector(
    (state: RootState) => state.todos
  );

  useEffect(() =>{ 
     dispatch(fetchTodos());
     
  },[dispatch]);
  

  

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

  return (
    <>
      <Header></Header>
      <main className={styles.container}>
        <section className={styles.projectSection}>
          <button className={styles.add} >
            ➕Add
          </button>
          {todos.todos?.map((todo: todo, index: number) => (
            <TodoItem key={index} todo={todo} />
          ))}
        </section>
      </main>

      <Footer></Footer>
    </>
  );
};
