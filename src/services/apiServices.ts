import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

// interface User {
//   email: string;
//   password: string;
// }

// interface LoginResponse {
//   token: string;
//   user: User;
// }

// interface Todo {
//   _id: string;
//   userId: string;
//   title: string;
//   description: string;
//   dueDate: Date;
//   priority: string;
//   completed: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }

const loginResponse = api.post("/auth/login", {
  email: "chandrashekar1@gmail.com",
  password: "chandu123",
});

const loginData = await loginResponse;

export const getAllTodo = () => {
  return loginData.data;
};
