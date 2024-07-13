import axios from "axios";

//import { useAuth } from "../context/AuthContext";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

// const { isAuthenticated } = useAuth();

//get all data

const config = {
  headers: {
    "x-auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTFjMDIzYjBmZjRiNjZlYjFlZmFhMyIsImlhdCI6MTcxNjYzMzg5MH0.dINkVfAH4G-esECvJaO-4kks2G78s2BBRvOxjduveHs",
  },
};

export async function getAllTodo() {
  const res = await api.get("/todo/", config);

  return res.data;
}

export async function deleteById(id: string) {
  const res = await api.delete(`/todo/${id}`, config);

  return res;
}
type Todo = {
  title: string;
  description: string;
  dueDate: Date;
  priority: boolean;
};

export async function createTodo(todo: Todo) {
  const res = await api.post("/todo/", todo, config);
  return res;
}
