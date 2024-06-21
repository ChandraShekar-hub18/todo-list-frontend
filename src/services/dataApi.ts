import axios from "axios";
//import { useAuth } from "../context/AuthContext";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

// const { isAuthenticated } = useAuth();

//get all data

export async function getAllTodo() {
  const res = await api.get("/todo/", {
    headers: {
      "x-auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTFjMDIzYjBmZjRiNjZlYjFlZmFhMyIsImlhdCI6MTcxNjYzMzg5MH0.dINkVfAH4G-esECvJaO-4kks2G78s2BBRvOxjduveHs",
    },
  });

  return res.data;
}
