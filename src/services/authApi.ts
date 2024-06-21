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

//Register User
interface newUser {
  username: string;
  email: string;
  password: string;
}
export const registerUser = async ({ username, email, password }: newUser) => {
  console.log(username, email, password);
  try {
    const registeredUser = await axios.post("/auth/register", {
      username,
      email,
      password,
    });

    if (registeredUser.status === 400) {
      throw Error("User Already exists");
    } else {
      return registeredUser;
    }
  } catch (err) {
    console.error(err);
  }
};

interface LoginUser {
  email: string;
  password: string;
}

//Login in User
export const loginUser = async ({ email, password }: LoginUser) => {
  try {
    const loginResponse = api.post("/auth/login", {
      // email: "chandrashekar1@gmail.com",
      // password: "chandu123",
      email,
      password,
    });
    const loginData = await loginResponse;
    console.log(loginData);
    return loginData;
  } catch (err) {
    console.error(err);
  }
};
