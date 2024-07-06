import React from "react";
import styles from "./TodoItem.module.css";
import { MdDelete } from "react-icons/md";
import { deleteById } from "../../services/dataApi";
import toast from "react-hot-toast";


type todo = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
};
export const TodoItem: React.FC<{ todo: todo }> = ({ todo }) => {

  function handleDelete(){
    const id = todo._id;
    console.log(id);
    
      deleteById(id).then(() => toast.success("Successfully deleted")).catch(() => toast.error(`Error deleting...`));
    
  }

  return (
    <div className={styles.container}>
      <div>
       <ul >
      <li>{todo.title}</li>
      <li>{todo.description}</li>
    </ul>
    </div>
    <MdDelete size={23} className={styles.delete} color="#EE4E4E" onClick={handleDelete}/>
    </div>
  );
};
